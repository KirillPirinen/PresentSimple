const appError = require('../Errors/errors');
const {Form, Present} = require('../../db/models');

module.exports = class PresentsController {
  static checkForm = async (req, res, next) => {
    try{
      const form = await Form.findOne({where:{id:req.params.uuid}})
      if(form?.isActive) {
          res.locals.form = form;
          next()
      } else {
        next(new appError(400, "Анкета не найдена или уже неактивна"))
      }
    } catch (err) {
      next(new Error(err))
    }
  } 
  static getAllPresents = async (req, res, next) => {
    try {
      const presents = await Present.findAll({where:{form_id:res.locals.form.id}, 
      include:{
        model:Form,
        attributes:['name','lname','createdAt']
      }})
      if(presents?.length) {
        res.json(presents)
      }else {
        next(new appError(404, "Список подарков не найден"))
      }
    } catch (err) {
      next(new Error(err))
    }
  }
}
