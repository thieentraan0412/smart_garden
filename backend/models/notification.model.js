const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    type: String,
    userID: String,
    urgent: Boolean,
    isRead: Boolean,
    measure: Number,
    threshold: Number,
    time: Date,
    gardenName: String,
    coordinates: {
        x: Number,
        y: Number
    },
})

module.exports = mongoose.model('notifications', notificationSchema)