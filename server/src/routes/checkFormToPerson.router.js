const { Router } = require('express')
const checkFormToPersonController = require('../controllers/checkFormToPerson.controller')

const router = Router()

router.post('/addPresentRecipient', checkFormToPersonController.check)
        .post('/addPresentRecipient/new', checkFormToPersonController.addNewForm)

// checkFormToPersonRouter.post('/sendFormToPresentRecipient', checkFormToPersonController.sendFormToPerson)

module.exports = router
