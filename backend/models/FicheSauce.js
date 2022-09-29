//IMPORT OF : Mongoose
const mongoose = require('mongoose')

//DataBase Model Sauce for frontend 
const ModelSauce = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},

    heat: {type: Number, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true}
    // usersLiked: {type: Array, required: false},
    // usersDisliked: {type: Array, required: false}
})

module.exports = mongoose.model("sauces", ModelSauce)
