const {Form, PriceRange} = require('../../db/models');
const appError = require('../Errors/errors');

module.exports = class SentFormController {
  static checkForm = async (req, res, next) => {
    try{
      const raw = await Form.findOne({
        attributes:['id', 'name', 'lname', 'phone', 'email', 'status'],
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
        order: [['id','ASC']]})
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
}
