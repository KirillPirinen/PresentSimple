const { Router } = require('express')
const groupController = require('../controllers/group.controller')

const groupRouter = Router()

groupRouter.post('/add', groupController.addGroup)
groupRouter.post('/alone', groupController.addAlone)
groupRouter.post('/join', groupController.joinGroup)

module.exports = groupRouter
