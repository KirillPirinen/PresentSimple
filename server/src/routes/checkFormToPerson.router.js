const { Router } = require('express')
const checkFormToPersonController = require('../controllers/checkFormToPerson.controller')

const checkFormToPersonRouter = Router()

checkFormToPersonRouter.post('/addPresentRecipient', checkFormToPersonController.check)

module.exports = checkFormToPersonRouter
