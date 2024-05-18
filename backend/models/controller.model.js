const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Controller = new Schema({
    id: Number,
    owner: String, // Record nay thuoc ve thiet bi nao String
    type: String,
    controlList: [
        {
            index:Number,
            controller: String,
            value: Number
        }
    ]
})
module.exports = mongoose.model('controller',Controller)