//IMPORT OF : Mongoose
const mongoose = require('mongoose')

//IMPORT OF : mongoose unique validator
const uniqueValidator = require('mongoose-unique-validator')

// DataBase Model for the user's signup 
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

//Pour empêcher l'enregistrement de 2 adresses mail similaires dans la database 
userSchema.plugin(uniqueValidator)
//Module exportation 
module.exports = mongoose.model("user", userSchema)