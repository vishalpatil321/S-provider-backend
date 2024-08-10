const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async() =>{
     try {
       await mongoose.connect(process.env.MONGO_URL);
       console.log(`Database connected`.bgGreen.white);
     } catch (error) {
         console.log(`Mongo db issue ${error}`.bgRed.white);
     }
};

module.exports = connectDb;