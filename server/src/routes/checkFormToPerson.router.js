const { Router } = require('express')
const checkFormToPersonController = require('../controllers/checkFormToPerson.controller')

const checkFormToPersonRouter = Router()

checkFormToPersonRouter.post('/addPresentRecipient', checkFormToPersonController.check)
// checkFormToPersonRouter.post('/sendFormToPresentRecipient', checkFormToPersonController.sendFormToPerson)

module.exports = checkFormToPersonRouter
