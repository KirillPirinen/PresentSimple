const bcrypt = require("bcrypt");
const { User } = require("../../db/models");

const signUp = async (req, res) => {
  const { name, lname, email, phone, password } = req.body;

  const personInDataBase = User.findOne({ where: { phone: phone } });
  if (personInDataBase) {
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
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
};

const signIn = async (req, res) => {
  const { password, email, phone } = req.body;

  if (password && email) {
    try {
      const currentUser = await User.findOne({ where: { email: email } });
      if (
        currentUser &&
        (await bcrypt.compare(password, currentUser.password))
      ) {
        req.session.user = {
          id: currentUser.id,
          name: currentUser.name,
        };

        return res.json({ id: currentUser.id, name: currentUser.name });
      }
      return res.sendStatus(401);
    } catch (error) {
      return res.sendStatus(500);
    }
  } else if (password && phone) {
    try {
      const currentUser = await User.findOne({ where: { phone: phone } });
      if (
        currentUser &&
        (await bcrypt.compare(password, currentUser.password))
      ) {
        req.session.user = {
          id: currentUser.id,
          name: currentUser.name,
        };

        return res.json({ id: currentUser.id, name: currentUser.name });
      }
      return res.sendStatus(401);
    } catch (error) {
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(400);
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
    const user = await User.findOne({ where: { id: req.session.user.id } });
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
