const SentFormController = require('../controllers/sentForm.controller')

const router = require('express').Router()

router.get('/:uuid', SentFormController.checkForm, SentFormController.getPriceRanges)

module.exports = router;
