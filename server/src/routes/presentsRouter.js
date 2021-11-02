const router = require('express').Router()
const PresentsController = require('../controllers/presents.controller');
router  
  .get('/:uuid', PresentsController.checkForm, PresentsController.getAllPresents)

  module.exports = router;
