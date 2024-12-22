const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process with a failure
    }
};

module.exports = connectDb;
