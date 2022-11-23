//Importation du modèle de la BDD Mongo DB Atlas
const FicheSauce = require('../models/FicheSauce');
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
   //Récupération de l'objet au sein de la BDD 
   FicheSauce.findOne()
   .then((objet) => {
    console.log(objet)
    //Utilisation de la méthode Javascript include 
    //Utilisation de l'opérateur $ inc 
    //Utilisation de l'opérateur $ push 
    //Utilisation de l'opérateur $ pull 

    //si le usersLiked est false et si Like == 1, alors mettre +1 au likes et enregistré l'userId dans le tableau
     if(!objet.usersLiked.includes(req.body.userId) && req.body.like === 1){
        console.log("Cet userId n'est pas présent dans le tableau userLiked de cet objet")
     
     //mise à jour de la BDD
     FicheSauce.updateOne(
        {_id : req.params.id},
        {
            $inc: {likes : 1},
            $push: {usersLiked : req.body.userId}
        }
     )
     .then(() => res.status(201).json({message : "Like enregistré"}))
     .catch((error) => res.status(400).json({error}))
    }
    if(objet.usersLiked.includes(req.body.userId) && req.body.like === 0){
        console.log("Cet userId n'est pas présent dans le tableau userLiked de cet objet")
     
     //mise à jour de la BDD
     FicheSauce.updateOne(
        {_id : req.params.id},
        {
            $inc: {likes : -1},
            $pull: {usersLiked : req.body.userId}
        }
     )
     .then(() => res.status(201).json({message : "Modif enregistré"}))
     .catch((error) => res.status(400).json({error}))
    }
})
    .catch((error) => res.status(400).json({error}))    
    
   
 

    //Like = 0

    //Like = -1 (Dislike)
};
