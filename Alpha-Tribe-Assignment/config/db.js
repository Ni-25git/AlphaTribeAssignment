const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.mongoURL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};

module.exports = connectDb;
