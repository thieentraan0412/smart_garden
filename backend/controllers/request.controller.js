const { response } = require('express')
const Request = require('../models/request.model')
const mongoose = require("mongoose");
const Types = mongoose.Types;
const ObjectId = Types.ObjectId;
exports.registerGarden = (req, res) => {
    data = req.body
    Request.insertMany([
        {
            status: false,
            isHidden: false,
            name: 'Register Garden',
            sender: data.sender,
            description: 'Register garden request',
            device: [
                {
                    name: data.device[0].name,
                    quantity: data.device[0].quantity
                },
                {
                    name: data.device[1].name,
                    quantity: data.device[1].quantity
                },
                {
                    name: data.device[2].name,
                    quantity: data.device[2].quantity
                },
                {
                    name: data.device[3].name,
                    quantity: data.device[3].quantity
                },
                {
                    name: data.device[4].name,
                    quantity: data.device[4].quantity
                }
            ],
            registerGarden: data.registerGarden
        }
    ])
}

exports.modifyGarden = (req, res) => {
    data = req.body
    Request.insertMany([
        {
            status: false,
            isHidden: false,
            name: 'Modify Garden',
            sender: data.sender,
            description: 'Modify garden request',
            device: [
                {
                    name: data.device[0].name,
                    quantity: data.device[0].quantity
                },
                {
                    name: data.device[1].name,
                    quantity: data.device[1].quantity
                },
                {
                    name: data.device[2].name,
                    quantity: data.device[2].quantity
                },
                {
                    name: data.device[3].name,
                    quantity: data.device[3].quantity
                },
                {
                    name: data.device[4].name,
                    quantity: data.device[4].quantity
                }
            ],
            registerGarden: data.registerGarden
        }
    ])
}

exports.deleteGarden = (req, res) => {
    data = req.body
    Request.insertMany([
        {
            status: false,
            isHidden: false,
            name: 'Delete Garden',
            sender: data.sender,
            description: 'Delete garden request',
            device: [],
            registerGarden: data.registerGarden
        }
    ])
}


exports.getRequest = (req, res) => {
    Request.find({})
        .then(user => res.status(200).send(user))
        .catch(err => res.status(400).send(err))
}


exports.hideRequest = (req, res) => {
    const data = req.body
    // console.log('data ne');
    const id = data.id
    const key = new ObjectId(id)
    // console.log('id ne ' + id);
    const typ = data.type
    if (typ == "read") {
        // console.log('vao read ne')
        // console.log('type of ne')
        Request.collection.updateOne(
            { _id: key },
            {
                $set: {
                    status: true
                }
            }
        )
        .then(item => res.status(200).send(item))
        .catch(err => res.status(400).send(err))
    } else {
        Request.collection.updateOne(
            { _id: key },
            {
                $set: {
                    isHidden: true
                }
            }
        ).then(item => res.status(200).send(item))
        .catch(err => res.status(400).send(err))
    }
    // res.status(200).send('hide request OK')
}