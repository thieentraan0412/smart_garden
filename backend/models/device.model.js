const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Device = new Schema({
    id: Number,
    name: String, // tên của device
    type: String, // loại của device, đèn, máy bơm hoặc cảm biến
    owner: String, // Dùng để biết thiết bị thuộc khu vườn nào. owner = customer
    coordinates: {
        x: Number,
        y: Number
    },
    status: Boolean, // true = hoạt động, false = đang hỏng     
    threshold: {
        min: Number,
        max: Number
    },
    water: Number,
    time: Number,
    garPiece: Number,
    install_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('device', Device)