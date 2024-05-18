const express = require('express')
const schedule = require('../controllers/schedule.controller')
const userController = require('../controllers/user.controller')

module.exports = app =>{
    router = express.Router()
    router.post('/:id',schedule.updateSchedule)
    router.post('/', schedule.postSchedule);

    const intervalObj = setInterval(()=>{
        schedule.schedulePump()
    },2000);
    router.get('/manualPump/:status/:user',schedule.manualPump)
    router.get('/listSchedule', schedule.getListSchedule);
    router.get('/', schedule.schedulePump);
    router.delete('/:id',schedule.deleteById);
    router.delete('/',schedule.deleteAll)
    app.use('/api/schedulee',router)
}

