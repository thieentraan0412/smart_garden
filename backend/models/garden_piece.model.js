const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Garden_piece = new Schema({
    id: Number,
    date: { type: Date, default: Date.now }, //Ngay bat dau trong cay
    name: String,
    type: String, // Loai cay trong
    location: String,
    owner: String,
    area: Number,
    days: Number // Tong ngay chieu sang cho cay
});

module.exports = mongoose.model('garden_piece', Garden_piece)
