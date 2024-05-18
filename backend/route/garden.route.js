const express = require('express')
const gardenController = require('../controllers/garden.controller')

module.exports = app => {
    router = express.Router()
    router.get('/', gardenController.getName)
    app.use('/api/garden', router)
}

