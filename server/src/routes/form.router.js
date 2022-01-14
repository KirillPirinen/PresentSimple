const { Router } = require('express')
const formController = require('../controllers/form.controller')

const router = Router()

router.post('/', formController.addNewForm)
        .post('/search', 
        formController.checkInputsMiddleware, 
        formController.findUser, 
        formController.findForms,
        formController.searchEnd)

module.exports = router
