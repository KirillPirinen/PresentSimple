const { Router } = require('express')
const authController = require('../controllers/auth.controller')
const checkAuth = require('../middleware/checkAuth')

const authRouter = Router()

authRouter.post('/signup', authController.signUp)
authRouter.post('/signin', authController.signIn)
authRouter.get('/signout', authController.signOut)
authRouter.get('/check', checkAuth, authController.checkAuth)
authRouter.post('/checkemail', authController.checkEmail)
authRouter.post('/resetpassword/:reset_password_id', authController.ResetPasswordBack)

module.exports = authRouter
