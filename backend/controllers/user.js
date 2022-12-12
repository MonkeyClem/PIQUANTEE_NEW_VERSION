//IMPORT DE : bcrypt pour le hash du mot de passe
const bcrypt = require ('bcrypt');
//IMPORT : javascriptwebtoken;
const jwt = require('jsonwebtoken')
//IMPORT DE : schéma d'utilisateur (../models/user), qui sera utiliser lors la création/vérification d'utilisateur
const User = require('../models/user')
//IMPORTATION DE : module CORS, permettant d'éviter les erreurs relatives à l'origine de la requête 
var cors = require('cors');
//IMPORTATION DE : express
const express = require('express')
//Stockage de la méthode express() dans la constante app
app = express()
//Utilisation du module CORS sur chacune des requêtes traitées 
app.use(cors());


//Création de la fonction signup
exports.signup = (req, res, next) => {

    //PASSWORD HASH
    bcrypt.hash(req.body.password, 10) /* L'algo sera exécuté 10 fois*/
    .then((hash) =>{
        /*Création de la constante user, qui nous sert à créer un nouvel utilisateur selon 
        le modèle définit dans models/user*/
        const user = new User({
            email: req.body.email,
            password : hash
        })
        //Envoi vers la base de données MongoDB Atlas
        user.save()
        .then(() => res.status(201).json({message: "Nouvel utilisateur crée et sauvegardé"}))
        .catch((error) => res.status(500).json({error : error})) //Mettre en 401 ?
    })
    .catch((error) => res.status(500).json({error : error}))

}

//Création de la fonction signup
exports.login = (req, res, next) => {

//LE CONTENU DE LA REQUETE
//D'abord, nous cherchons dans la database afin de savoir le mail est déjà enregistré ou non
User.findOne({email: req.body.email})
    .then((user) => {
        if(!user){
            return res.status(400).json({error : 'Unexistant User'})
        }
        //CONTROL THE PASSWORD 
        bcrypt.compare(req.body.password, user.password)
            .then((controlPassword) => {

                //Si le controle nous retourne false 
                if(!controlPassword){
                    throw("Le MDP n'est pas correct")
                    // res.status(401).json({error : 'Le mot de passe est incorrect'})
                }
                //The password is correct
                //Envoi du userId et du Token dans la response 
                res.status(200).json({
                    userId : user._id,
                    token : jwt.sign(
                        ///3 arguments :
                        {userId: user._id},
                        `${process.env.JWT_KEY_TOKEN}`,
                        {expiresIn: 3600}
                    )
                })
        })
            .catch((error) => res.status(500).json({error}))
            // res.status(200).json({message: "A similar mail adress has been found"})
    })
    .catch((error) => res.status(500).json({error}));
}

