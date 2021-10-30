const appError = require('../Errors/errors');

module.exports = function(err, req, res, next) {
  if(err instanceof appError) {
    return res.json({status:err.status, message:err.message})
  }
  return res.status(500).json({status:false, message:`Что-то пошло не по плану...  \r\n${err.message}`})
};
