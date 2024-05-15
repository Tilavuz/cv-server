const mongoose = require('mongoose')

const database = process.env.DATABASE

const connectDb = async () => {
    mongoose.connect(`${database}/cv-database`).then(() => {
        console.log("Connected to the base");
    }).catch((err) => {
        console.log("Didn't connect to the base", err);
    })
}

module.exports = connectDb