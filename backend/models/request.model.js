const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Request = new Schema({
    id: ObjectId,
    status: Boolean,
    isHidden: Boolean,
    name: String,
    sender: String,
    date: { type: Date, default: Date.now },
    description: String,
    device: [
        {
            name: String,
            quantity: Number
        }
    ],
    registerGarden: Object

});

module.exports = mongoose.model('request', Request)
