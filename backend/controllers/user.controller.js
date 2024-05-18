const User = require('../models/user.model')

exports.getUserMail = async (account) => {
    const email = User.find({ 'account': account })
        .then(user => user[0].email)
        .catch(err => console.log(err))
    return email
}

exports.getUsers = (req, res) => {
    User.find({})
        .then(user => res.status(200).send(user))
        .catch(err => res.status(400).send(err))
}

exports.addRegister = (req, res) => {

    const data = req.body;
    User.findOne({})
        .sort({ id: 'desc' })
        .then(latest => {
            data.id = latest.id + 1;

            User.insertMany([
                {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    account: data.account,
                    address: data.address,
                    role: 'customer',
                    status: false,
                    isDelete: false,
                    date: data.date, // Ngay sinh, chi co customer co
                }
            ])
        })
}

exports.getOneUser = (req, res) => {
    User.findOne({ account: req.params['account'] })
        .then(user => res.status(200).send(user))
        .catch(err => res.status(400).send(err))
}


exports.updateUserInfor = (req, res) => {
    const id = req.params['id']
    console.log('id ne ' + id);
    const data = req.body
    const typ = data.type
    let query = {}
    if (typ == "update") {
        query = {
            $set: {
                email: data.email,
                phone: data.phone,
                password: data.password,
                address: data.address
            }
        }
    } else if (typ == "disable") {
        query = {
            $set: {
                status: data.status
            }
        }
    } else {
        query = {
            $set: {
                isDelete: true
            }
        }
    }
    User.collection.updateOne(
        { "id": parseInt(id) },
        query
    ).then(user => res.status(200).send(user))
        .catch(err => res.status(400).send(err))
    // User.findOne({ id: id })
    //     .then(user => res.status(200).send({"id": parseInt(id)}))
    //     .catch(err => res.status(400).send(err))
}
