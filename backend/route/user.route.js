const express = require('express')
const userController = require('../controllers/user.controller')

module.exports = app =>{
    router = express.Router()
    router.get('/', userController.getUsers)
    router.post('/', userController.addRegister)
    router.post('/:id', userController.updateUserInfor)
    router.get('/:account', userController.getOneUser)
    app.use('/api/user',router)
}

