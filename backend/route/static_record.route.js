const express = require('express')
const RecordController = require('../controllers/record.controller')

module.exports = app => {
    router = express.Router()
    router.get('/static', RecordController.getRecord)
    app.use('/api/record', router)
}

