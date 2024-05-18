const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Garden = new Schema({
    id: ObjectId,
    name: String,
    owner: String
});

module.exports = mongoose.model('garden', Garden)
