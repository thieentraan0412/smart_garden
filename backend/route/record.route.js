const express = require('express')
const RecordController = require('../controllers/record.controller')

module.exports = (app, io) => {
    router = express.Router()
    const intervalObj = setInterval(()=>{

        RecordController.autoUpdate(io)
    },1000);
    router.get('/', RecordController.getRecord)
    router.get('/:piece', RecordController.getPrivateRec)
    app.use('/api/record', router)
}

