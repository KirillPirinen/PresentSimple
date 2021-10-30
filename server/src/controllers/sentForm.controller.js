const {Form, PriceRange} = require('../../db/models');
const appError = require('../Errors/errors');

module.exports = class SentFormController {
  static checkForm = async (req, res, next) => {
    try{
      const raw = await Form.findOne({where:{id:req.params.uuid}})
      const form = raw || {status:false};
      if(form.status) {
        next()
      } else {
        next(new appError(false, 'Форма не найдена или уже заполнена'))
      }
    } catch(err) {
        next(new Error('Неправильный адрес формы или сервер умер'))
    }
  }

   static getPriceRanges = async (req,res) => {
    try {
      const ranges = await PriceRange.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        order: [['id','ASC']]})
      res.json({status:true, data:ranges})
    } catch (err) {
      res.json({status:false, message:err.message})
    }
  }
}
