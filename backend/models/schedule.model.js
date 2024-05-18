const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Schedule = new Schema({
    id: ObjectId,
    owner:String,
    time:String,
    water:Number,
    type:String,
    dates:Object
});
module.exports = mongoose.model('schedule', Schedule)
