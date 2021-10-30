const { User } = require("../../db/models");
const { Form } = require("../../db/models/form");

const check = async (req, res) => {
  const { name, lname, email, phone } = req.body;

  const personInDataBasePhone = await User.findOne({ where: { phone: phone } });
  const personInDataBaseEmail = await User.findOne({ where: { email: email } });

  if (personInDataBasePhone) {
    const person = await User.findOne({ where: { phone: phone } });
    return res.status(200).json(person);
  } else if (personInDataBaseEmail) {
    const person = await User.findOne({ where: { email: email } });
    return res.status(200).json(person);
  }

  if (name && lname && email) {
    try {
      const person = await Form.create({ ...req.body });
      return res.status(201).json(person);
    } catch (error) {
      res.sendStatus(500);
    }
  }
};

module.exports = {
  check,
};
