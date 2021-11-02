const bcrypt = require("bcrypt");
// const { noExtendLeft } = require("sequelize/types/lib/operators");
const { User } = require("../../db/models");
const {checkInput} = require('../functions/validateBeforeInsert');
const appError = require('../Errors/errors');

const signUp = async (req, res) => {
  const { name, lname, email, phone, password } = req.body;

  const personInDataBasePhone = await User.findOne({ where: { phone: phone } });
  const personInDataBaseEmail = await User.findOne({ where: { email: email } });

  if (personInDataBasePhone || personInDataBaseEmail) {
    return res.sendStatus(403);
  }

  if (name && password && email && phone) {
    try {
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        lname,
        phone: phone,
        email,
        password: hashPassword,
      });

      req.session.user = {
        id: newUser.id,
        name: newUser.name,
      };

      return res.json({ id: newUser.id, name: newUser.name });
    } catch (error) {
      if (
        error.message == "Validation error: Phone number should be 11 symbols"
      ) {
        return res.sendStatus(411);
      } else {
        return res.sendStatus(401);
      }
    }
  }
  return res.sendStatus(400);
};

const signIn = async (req, res, next) => {
  const input = checkInput(req.body, ['password', 'email'], true);

  if (input) {
    const {email, password} = input;
    try {
      const currentUser = await User.findOne({ where: { email } });
      if (currentUser) {
        if(await bcrypt.compare(password, currentUser.password)) {
          req.session.user = {
            id: currentUser.id,
            name: currentUser.name,
          };
          return res.json({ id: currentUser.id, name: currentUser.name });
        } else {
          next(new appError(401, "Неверный пароль"));
        }
      } 
    } catch (error) {
      next(new Error(error));
    }
  } else {
     next(new appError(400, "Не заполнены необходимые поля"))
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
    const user = await User.findOne({ where: { id: req.session?.user?.id } });
    return res.json(user);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  signIn,
  signOut,
  signUp,
  checkAuth,
};

// } else if (password && phone) {
  //   try {
  //     const currentUser = await User.findOne({ where: { phone: phone } });
  //     if (
  //       currentUser &&
  //       (await bcrypt.compare(password, currentUser.password))
  //     ) {
  //       req.session.user = {
  //         id: currentUser.id,
  //         name: currentUser.name,
  //       };

  //       return res.json({ id: currentUser.id, name: currentUser.name });
  //     }
  //     return res.sendStatus(401);
  //   } catch (error) {
  //     return res.sendStatus(500);
  //   }
