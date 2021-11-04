const bcrypt = require("bcrypt");
// const { noExtendLeft } = require("sequelize/types/lib/operators");
const { User, Sequelize, Wishlist, ResetPassword } = require("../../db/models");
const { Op } = Sequelize;
const { checkInput } = require("../functions/validateBeforeInsert");
const appError = require("../Errors/errors");
const MailController = require("./emailController/email.controller");
const { changePassword } = require("../functions/htmlResetPassword");
const { uuid } = require("uuidv4");

const signUp = async (req, res, next) => {
  const input = checkInput(
    req.body,
    ["password", "email", "name", "lname", "phone"],
    true
  );
  if (input) {
    //если инпут валиден
    phone = input.phone.slice(1);
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
        return next(
          new appError(
            403,
            `Пользователь ${coincidence} уже существует авторизируйтесь`
          )
        );
      }
    } catch (err) {
      return next(new Error(err));
    }
    //создаём пользователя
    if (input.phone.length !== 11)
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
      };

      return res.json({
        user: { id: newUser.id, name: newUser.name },
        wishlist: wishlist,
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
          };
          return res.json({ id: currentUser.id, name: currentUser.name });
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
    console.log("user", user);
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
};
