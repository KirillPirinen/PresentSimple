const { Router } = require('express')
const formController = require('../controllers/form.controller')

const router = Router()

router.post('/', formController.addNewForm)
        .post('/search', formController.check)

module.exports = router
