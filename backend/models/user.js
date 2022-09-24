// // IMPORT OF : Mongoose
const mongoose = require('mongoose')

// Data Model for the signup 

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

//Module exportation 
module.exports = mongoose.model("user", userSchema)