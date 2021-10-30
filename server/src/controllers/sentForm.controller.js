const {Form, PriceRange, Present, User} = require('../../db/models');
const appError = require('../Errors/errors');
const validateBeforeInsert = require('../functions/validateBeforeInsert');
const MailController = require('./emailController/email.controller')
const htmlMessage = require('../functions/htmlMessage')

module.exports = class SentFormController {
  static checkForm = async (req, res, next) => {
    try{
      const raw = await Form.findOne({
        attributes:['id', 'name', 'lname', 'phone', 'email', 'status', 'user_id'],
        where:{id:req.params.uuid}})
      const form = raw || {status:false};
      if(form.status) {
        res.locals.guest = form;
        next()
      } else {
        next(new appError(false, 'Форма не найдена или уже заполнялась'))
      }
    } catch(err) {
        next(new Error('Неправильный адрес формы или сервер умер'))
    }
  }

   static getPriceRanges = async (req, res, next) => {
    try {
      const ranges = await PriceRange.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        order: [['from','ASC']]})
      if(ranges) {
        const response = {status:true, data:ranges}
        if(res.locals.guest) response.guest = res.locals.guest
        res.json(response)
      } else {
        next(new appError(false, 'Нет диапазона цен'))
      }
    } catch (err) {
       next(new Error(err))
    }
  }

  static fillingForm = async (req, res, next) => {
    try{
      const readyToPush = validateBeforeInsert(req.body, res.locals.guest.id)
      if(readyToPush) {
        const {length} = await Present.bulkCreate(readyToPush, {returning: ['id']}) 
        await Form.update({status:false}, {where:{id:res.locals.guest.id}})
        res.json({status:"success", message:`Спасибо! Вы добавили ${length} подарков`})

        //уведомляем инициатора
        const formInitiator = await User.findOne({where:{id:res.locals.guest.user_id}})
        const html = htmlMessage(res.locals.guest.name);
        MailController.sendEmail(formInitiator.email, "Отправленная анкета заполнена", html)

      } else {
        next(appError('empty', 'Пожалуйста добавьте хоть один подарок...'))
      }
    } catch(err) {
      next(new Error('Ошибка добавления подарков, попробуйте ещё раз'))
    }
  }
}
