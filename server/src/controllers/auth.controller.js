const bcrypt = require("bcrypt");
const { User, Sequelize, Wishlist, ResetPassword } = require("../../db/models");
const Op = Sequelize.Op;
const { checkInput } = require("../functions/validateBeforeInsert");
const appError = require("../Errors/errors");
const MailController = require("./emailController/email.controller");
const { changePassword } = require("../functions/htmlResetPassword");
const { uuid } = require("uuidv4");
const {OAuth2Client} = require("google-auth-library");
const stringGenerator = require('../functions/stringGenerator')

const googleClient = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID
})

const googleAuth = async (req, res, next) => {

  const { token } = req.body;

  let ticket;

  try {
    ticket = await googleClient.verifyIdToken({
      idToken:token,
      audient: `${process.env.GOOGLE_CLIENT_ID}`,
    });
    ticket = ticket.getPayload()
  } catch(err) {
    return next(new appError(400, `Ошибка Google авторизации ${err.message}`))
  }
    //if(!ticket) return;
    const {email, picture:avatar, given_name:name, family_name:lname} = ticket;
    const personInDataBase = await User.findOne({where:{ email }});

    if(personInDataBase) {

      req.session.user = {
        id: personInDataBase.id,
        name: personInDataBase.name,
        lname: personInDataBase.lname,
      };

      res.json(
        {
          info:`Вы успешно авторизировались с почты ${email}`,
          id:personInDataBase.id,
          name:personInDataBase.name,
          lname:personInDataBase.lname
        }
      )

  } else {
    try {
      const randomPass = stringGenerator(5)
      const hashPassword = await bcrypt.hash(randomPass, 4);
      const newUser = await User.create({
        name,
        lname,
        avatar,
        email,
        password: hashPassword,
      });

      const html = `<p>Ваш пароль врмененный пароль: <b>${randomPass}</b>, просим Вас сменить его как можно скорее</p>`
      await MailController.sendEmail(email, "Ваш пароль от сервиса Present Simple", html)

      const wishlist = await Wishlist.create({user_id:newUser.id})

      req.session.user = {
        id: newUser.id,
        name: newUser.name,
        lname:newUser.lname
      };

      return res.json({
        id: newUser.id, name: newUser.name,
        info:`Вы успешно зарегистрировались с помощью Google аккаунта, на вашу почту ${email} направлен временный пароль, просим Вас изменить его как можно скорее, а также добавить Ваш телефон в свой профиль, так другим пользователям будет проще найти ваш список желаний`
      });
    } catch (error) {
      return next(new appError(404, error.message))
    }
  }
  
}

const signUp = async (req, res, next) => {
  const input = checkInput(
    req.body,
    ["password", "email", "name", "lname"],
    true
  );

  if (input) {
    //если инпут валиден
    input.phone = req.body.phone.slice(1) || null;
    try {
      const personInDataBase = await User.findOne({
        where: {
          [Op.or]: [
            { email: { [Op.like]: input.email } },
            { phone: { [Op.like]: `%${input.phone}` } },
          ],
        },
      });
      //проверка на наличие такого в базе
      if (personInDataBase) {
        const reg = new RegExp(input.phone);
        const coincidence =
          personInDataBase.email === input.email
            ? "c такой почтой"
            : reg.test(personInDataBase.phone)
            ? `с таким телефоном (ваша почта: ${personInDataBase.email})`
            : "с такими данными";
        return res.status(403).json({info:`Пользователь ${coincidence} уже существует авторизируйтесь`})
      }
    } catch (err) {
      return next(new Error(err));
    }
    //создаём пользователя
    if (input.phone && input.phone.length !== 11)
      return next(new appError(411, "Телефон должен быть длиной 11 символов"));
    try {
      let { email, phone, password, lname, name } = input;
      const hashPassword = await bcrypt.hash(password, 4);
      const newUser = await User.create({
        name,
        lname,
        phone,
        email,
        password: hashPassword,
      });

      const wishlist = await Wishlist.create({user_id:newUser.id})

      req.session.user = {
        id: newUser.id,
        name: newUser.name,
        lname: newUser.lname,
      };

      return res.json({
        id: newUser.id, name: newUser.name, lname:newUser.lname
      });

    } catch (error) {
      return next(new appError(404, error.message))
    }
  } else {
    return next(
      new appError(500, "Вы не ввели всех необходимых данных для регистрации")
    );
  }
};

const signIn = async (req, res, next) => {
  const input = checkInput(req.body, ["password", "email"], true);
  if (input) {
    const { email, password } = input;
    try {
      const currentUser = await User.findOne({ where: { email } });
      if (currentUser) {
        if (await bcrypt.compare(password, currentUser.password)) {
          req.session.user = {
            id: currentUser.id,
            name: currentUser.name,
            lname: currentUser.lname,
          };
          return res.json({ id: currentUser.id, name: currentUser.name, lname:currentUser.lname});
        } else {
          next(new appError(401, "Неверный пароль"));
        }
      } else {
        next(new appError(401, "Пользователь не найден"));
      }
    } catch (error) {
      next(new Error(error));
    }
  } else {
    next(new appError(400, "Не заполнены необходимые поля"));
  }
};

const signOut = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.sendStatus(500);

    res.clearCookie(req.app.get("cookieName"));

    return res.sendStatus(200);
  });
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.session?.user?.id },
      attributes: ["name", "lname", "id", "email", "phone"],
    });
    return res.json(user);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const checkEmail = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.json({ message: "Пользователь не найден" });
    } else {
      const link = await ResetPassword.create({ id: uuid(), user_id: user.id });
      const time = 1e3 * 86400;
      const html = changePassword(user, link.id, time);
      await MailController.sendEmail(
        user.email,
        "Ссылка для восстановления пароля на Present Simple",
        html
      );
      setTimeout(() => {
        link.destroy();
      }, time);
      return res.json({
        message:
          "Письмо с восстановлением пароля отправлено на электронную почту",
      });
    }
  } catch (error) {
    return res.json({ message: "Что-то пошло не так" });
  }
};

const ResetPasswordBack = async (req, res, next) => {
  const input = checkInput(req.body, ["password"], true);
  const { reset_password_id } = req.params;
  if (input.password) {
    //если инпут валиден
    try {
      const user = await ResetPassword.findOne({
        where: { id: reset_password_id },
        include: { model: User },
      });

      if (!user) {
        return res.json({
          message: "Ссылка не действительна",
        });
      }

      if (!user.User)
        return res.json({
          message:
            "Такого пользователя не существует, попробуйте зарегистрироваться",
        });
      let { password } = input;

      const hashPassword = await bcrypt.hash(password, 4);

      await User.update(
        { password: hashPassword },
        { where: { id: user.User.id } }
      );

      const reset_password = await ResetPassword.findOne({
        where: { id: reset_password_id },
      });
      reset_password.destroy();

      return res.json({
        message: "Вы успешно поменяли пароль, можете авторизоваться",
      });
    } catch (error) {
      return res.json({
        message: "Что-то пошло не так",
      });
    }
  } else {
    return res.json({ message: "Что-то пошло не так" });
  }
};

module.exports = {
  signIn,
  signOut,
  signUp,
  checkAuth,
  checkEmail,
  ResetPasswordBack,
  googleAuth
};
