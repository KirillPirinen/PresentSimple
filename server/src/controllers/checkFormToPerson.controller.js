const { User, Form, Sequelize } = require("../../db/models");
const {Op} = Sequelize;
const {checkInput} = require('../functions/validateBeforeInsert')
const appError = require('../Errors/errors');

const check = async (req, res, next) => {
  const input = checkInput(req.body, ['email', 'phone'], true)
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
          if(formInDataBase.length) {
            return res.status(201).json(formInDataBase);
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
