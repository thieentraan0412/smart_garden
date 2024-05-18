const express = require('express')
const ControlObserver = require('../controllers/controlObserver.controller')

module.exports = app => {
    router = express.Router()
    router.get('/controlAutoPump/:value',ControlObserver.controlAutoPump)
    app.use('/api/controlObserver',router)
}

