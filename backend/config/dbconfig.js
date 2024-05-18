const mongoose = require('mongoose');

async function connect() {
    const URL = 'mongodb://0.0.0.0:27017/smartgarden';

    try {
        await mongoose.connect(URL);
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}

module.exports = { connect };
