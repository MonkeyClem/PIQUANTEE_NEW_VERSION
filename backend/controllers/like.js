//Importation du modèle de la BDD Mongo DB Atlas
const FicheSauce = require('../models/FicheSauce');
const ModelSauce = require('../models/FicheSauce')

exports.likeFicheSauce = (req, res, next) => {
  
//Utilisation de la méthode Javascript include 
    //Utilisation de l'opérateur $ inc 
    //Utilisation de l'opérateur $ push 
    //Utilisation de l'opérateur $ pull 

//Like =  +1 
   //Récupération de l'objet au sein de la BDD 
   FicheSauce.findOne({_id : req.params.id })
   .then((objet) => {
    
    

    //si le usersLiked est false et si Like == 1, alors mettre +1 au likes et enregistré l'userId dans le tableau
     if(!objet.usersLiked.includes(req.body.userId) && req.body.like === 1){
     
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
    
    // MODIFIER LIGNES CI DESSOUS CAR BUG VIENT DE LA. A ajouter : && objet._id ===
    if(objet.usersLiked.includes(req.body.userId) && req.body.like === 0){
     
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


    //---------------------DISLIKES------------------------------------//

    if(!objet.usersDisliked.includes(req.body.userId) && req.body.like === -1){
     
     //mise à jour de la BDD
     FicheSauce.updateOne(
        {_id : req.params.id},
        {
            $inc: {dislikes : 1},
            $push: {usersDisliked : req.body.userId}
        }
     )
     .then(() => res.status(201).json({message : "Dislike + 1"}))
     .catch((error) => res.status(400).json({error}))
    }

    //Dislike = -1 
    if(objet.usersDisliked.includes(req.body.userId) && req.body.like === 0){
     
     //mise à jour de la BDD
     FicheSauce.updateOne(
        {_id : req.params.id},
        {
            $inc: {dislikes : -1},
            $pull: {usersDisliked : req.body.userId}
        }
     )
     .then(() => res.status(201).json({message : "Dislike retiré"}))
     .catch((error) => res.status(400).json({error}))
    }
})
    .catch((error) => res.status(400).json({error}))
};
