const express = require('express')
const {
    getNotification,
    deleteNotification,
    markReadedNotification,
} = require('../controllers/notification.controller')


module.exports = app => {
    router = express.Router()
    router.route('/')
        .delete(deleteNotification)
        .patch(markReadedNotification)

    router.route('/:account').get(getNotification)

    app.use('/api/notification', router)
}