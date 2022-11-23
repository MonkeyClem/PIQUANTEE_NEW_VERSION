//Importation du modèle de la BDD Mongo DB Atlas
const ModelSauce = require('../models/FicheSauce')

exports.likeFicheSauce = (req, res, next) => {
    console.log("Nous sommes dans le controller like")
    //Affichage du corps de la requête
    /* Pour la démonstration, la req sera envoyé par postman (body raw au format JSON) sous cette forme :
        {
            "userId" : "String" , 
            "like" : Number
        }
        A ajouter au README une fois le projet terminé 
    */
    console.log(req.body)
    //Nous récuperons l'id de l'utilisateur dans l'URL de la requête 
    console.log(req.params)

    //mise au format de l'id présent dans l'URL afin de trouver l'objet correspondant dans la BDD
   console.log("---> id mise au format _id")
   console.log({_id : req.params.id})
   
    //Like =  +1 

    //Like = 0

    //Like = -1 (Dislike)
};
