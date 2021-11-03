const router = require('express').Router()
const PresentsController = require('../controllers/presents.controller');
router  
  .get('/:uuid', PresentsController.checkForm, PresentsController.getAllPresents)
    .patch('/:uuid', PresentsController.checkForm, PresentsController.bindPresent)
  module.exports = router;
