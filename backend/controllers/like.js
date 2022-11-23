//Importation du modèle de la BDD Mongo DB Atlas
const ModelSauce = require('../models/FicheSauce')

exports.likeFicheSauce = (req, res, next) => {
    console.log("Nous sommes dans le controller like")
    console.log(req.body)
    console.log(req.params)

    //Like =  +1 

    //Like = 0

    //Like = -1 (Dislike = +1)
};
