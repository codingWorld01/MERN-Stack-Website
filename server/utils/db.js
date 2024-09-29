const mongoose = require('mongoose');

const URI = 'mongodb+srv://yatharth01:shiva123@cluster0.zuqqkxe.mongodb.net/mern_admin?';
// const URI = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection established");
    } catch (error) {
        console.error("Connection not established " + error);
    }
}

module.exports = connectDB;
