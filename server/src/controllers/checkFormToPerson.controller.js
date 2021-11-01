const { User, Form, Sequelize } = require("../../db/models");
const {Op} = Sequelize;
const {checkInput} = require('../functions/validateBeforeInsert')
const appError = require('../Errors/errors');

const check = async (req, res, next) => {
  const input = checkInput(req,body, ['email', 'phone'], true)
  if(input) {
    const {email, phone} = input;
    try {
      const personInDataBase = await User.findOne({ 
        where: {[Op.or]: [{email}, {phone}]}
      });
  
      if(personInDataBase) {
        return res.status(200).json(personInDataBase);
      } else {
          const formInDataBase = await Form.findAll({ 
            where: {[Op.or]: [{email}, {phone}]}
          }); 
          if(formInDataBase) {
            return res.status(200).json(formInDataBase);
          }
      } 
      
    return res.status(404).json({isFound:false, message:"Пользователь не найден, хотите отправить ему анкету?"});
  
    } catch (error) {
      next(new Error(`Ошибка поиска:${error.message}` ))
    }
  } else {
    next(new appError(500, 'Вы не ввели данных для поиска'))
  }
  
}

const addNewForm = async (req, res, next) => {
  const input = checkInput(req.body, ['name', 'lname', 'email', 'phone'], true)
  if (input) {
    try {
      const form = await Form.create(input);
      return res.status(201).json(form);
    } catch (error) {
      next(new Error(`Ошибка добавления:${error.message}` ))
    }
  }
};


module.exports = {
  check,
  addNewForm
};
// // const { v4: uuidv4 } = require("uuid");
// // const { User } = require("../../db/models");
// // const { Form } = require("../../db/models");
// // // const MailController = require("./emailController/email.controller");


// const check = async (req, res, next) => {
//   const input = checkInput(req,body, ['email', 'phone'], true)
//   if(input) {
//     const {email, phone} = input;
//     try {
//       const personInDataBase = await User.findOne({ 
//         where: {[Op.or]: [{email}, {phone}]}
//       });
  
//       if(personInDataBase) {
//         return res.status(200).json(personInDataBase);
//       } else {
//           const formInDataBase = await Form.findAll({ 
//             where: {[Op.or]: [{email}, {phone}]}
//           }); 
//           if(formInDataBase) {
//             return res.status(200).json(formInDataBase);
//           }
//       } 
      
//     return res.status(404).json({isFound:false, message:"Пользователь не найден, хотите отправить ему анкету?"});
  
//     } catch (error) {
//       next(new Error(`Ошибка поиска:${error.message}` ))
//     }
//   } else {
//     next(new appError(500, 'Вы не ввели данных для поиска'))
//   }
  
// }

// const addNewForm = async (req, res, next) => {
//   const input = checkInput(req.body, ['name', 'lname', 'email', 'phone'], true)
//   if (input) {
//     try {

// //       const person = await Form.create({ ...req.body, id: uuidv4() });
    
// //       // await MailController.sendEmail(email, 'Порадуй себя 🎁', '<p>eeeee</p>'));
// //       return res.status(201).json(person);

// //     } catch (error) {
// //       res.sendStatus(500);

//       const form = await Form.create(input);
//       return res.status(201).json(form);
//     } catch (error) {
//       next(new Error(`Ошибка добавления:${error.message}` ))

//     }
//   }
// };

// // const sendFormToPerson = async (req, res) => {
// //   const {person} = req.body
// //   console.log('person', person)
// //   await MailController.sendEmail(person.email, 'Порадуй себя 🎁', `http://localhost:3000/sentform/${person.id}`);
// //   return res.sendStatus(200)
// // }

// // module.exports = {
// //   check,
// //   sendFormToPerson,
