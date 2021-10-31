const { v4: uuidv4 } = require("uuid");
const { User } = require("../../db/models");
const { Form } = require("../../db/models");
// const MailController = require("./emailController/email.controller");

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
      const person = await Form.create({ ...req.body, id: uuidv4() });
    
      // await MailController.sendEmail(email, 'Порадуй себя 🎁', '<p>eeeee</p>'));
      return res.status(201).json(person);

    } catch (error) {
      res.sendStatus(500);
    }
  }
};

const sendFormToPerson = async (req, res) => {
  const {person} = req.body
  console.log('person', person)
  await MailController.sendEmail(person.email, 'Порадуй себя 🎁', `http://localhost:3000/sentform/${person.id}`);
  return res.sendStatus(200)
}

module.exports = {
  check,
  sendFormToPerson,
};
