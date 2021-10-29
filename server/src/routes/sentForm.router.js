const SentFormController = require('../controllers/sentForm.controller')

const router = require('express').Router()

router.get('/', SentFormController.getForm)

module.exports = router;
