const { User, Form, Sequelize } = require("../../db/models");
const {Op} = Sequelize;
const {checkInput} = require('../functions/validateBeforeInsert')
const appError = require('../Errors/errors');
const { uuid } = require('uuidv4');

const check = async (req, res, next) => {
  const input = checkInput(req.body, ['email', 'phone'], true)
  if(input) {
    phone = input.phone.slice(1)
    email = input.email
    try {
      const personInDataBase = await User.findOne({ 
        where: {[Op.or]: [
          {email:{[Op.like]:email}},
          {phone:{[Op.like]:`%${phone}`}} 
          ]}
      });
  
      if(personInDataBase) {
        return res.status(200).json(personInDataBase);
      } else {
          const formInDataBase = await Form.findAll({ 
            where: {
              [Op.or]: [
                  {email:{[Op.like]:email}},
                  {phone:{[Op.like]:`%${phone}`}} 
                  ]} 
            }); 
          if(formInDataBase.length) {
            return res.status(201).json(formInDataBase);
          }
      } 
      
      return res.status(303).json({info:"Пользователь не найден, хотите отправить ему анкету?"});
  
    } catch (error) {
      next(new Error(`Ошибка поиска:${error.message}` ))
    }
  } else {
    next(new appError(406, 'Вы не ввели данных для поиска'))
  }

}

const addNewForm = async (req, res, next) => {
  const input = checkInput(req.body, ['name', 'lname', 'email', 'phone'], true)
  if (input) {
    try {
      const form = await Form.create({id:uuid(), ...input, user_id:req.session.user.id});
      return res.status(200).json(form);
    } catch (error) {
      next(new Error(`Произошла ошибка добавления:${error.message}`))
    }
  } else {
    next(new appError(400, 'Вы не ввели все необходимые данные для создания анкеты'))
  }
};

module.exports = {
  check,
  addNewForm
};
