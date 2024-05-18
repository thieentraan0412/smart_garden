const Garden = require('../models/garden.model')

exports.getName = (req, res)=>{
    Garden.find({})
        .then(garden => res.status(200).send(garden))
        .catch(err => res.status(400).send(err))
}
