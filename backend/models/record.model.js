const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Record = new Schema({
    id: Number,
    name: String,
    owner: String, // Record nay thuoc ve thiet bi nao String
    type: String,
    // data.time.max = last value  adafruit (time)
    time: {
        // min: { type: Date, default: Date.now },
        max: { type: Date, default: Date.now } //*
    },
    // data.valueList.push({log_time, value})*
    valueList: [
        {
            controller:String,
            log_time: { type: Date, default: Date.now },
            value: String // value = 1/0: on/off. Còn khác giá trị này thì là sensor
            // Muốn kiểm tra giá trị thì dùng thêm trường type ở trên
        }
    ], 
    /*
    controlList: [
        {
            controller: String
            value: Number
        }
    ]
    */
    curValue: String, // render trên web
    garPiece: Number
});
module.exports = mongoose.model('record', Record)
