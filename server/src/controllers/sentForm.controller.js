const {Form} = require('../../db/models');

module.exports = class SentFormController {
  static getForm = async (req, res) => {
    try{
      const form = await Form.findOne({where:{id:req.params.id}})
      if(form && !form.status) {
        res.json(form)
      } else {
        res.json({error:'форма не найдена или уже заполнена'})
      }
    } catch {
      res.sendStatus(500)
    }
    
  }
}
