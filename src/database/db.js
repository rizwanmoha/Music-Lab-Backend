const mongoose = require("mongoose");

const connectDb = async () => {
    try {
    let dbEnv = process.env.NODE_ENV == "test" ? process.env.MONGO_TEST_URL : process.env.MONGO_URL
    await mongoose.connect(dbEnv);

        console.log('MongoDB connection established');
 
    }
    catch (error) {
        console.log('Error occured');
    }
}

module.exports = connectDb;
