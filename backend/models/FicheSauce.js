//IMPORT OF : Mongoose
const mongoose = require('mongoose')


//DataBase Model Sauce for frontend 
const ModelSauce = mongoose.Schema({
    name: {type: String, required: true},
    userId: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, default : 0, required: false},
    dislikes: {type: Number, default : 0, required: false},
    usersLiked: {type: [String], required: false},
    usersDisliked: {type: [String], required: false}
})

module.exports = mongoose.model("sauces", ModelSauce)
