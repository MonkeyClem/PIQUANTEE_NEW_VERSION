//IMPORT DE : bcrypt pour le hash du mot de passe
const bcrypt = require ('bcrypt');
//IMPORT DE : schéma d'utilisateur (../models/user), qui nous servira ensuite à la création/vérification d'utilisateur
const User = require('../models/user')
//IMPORTATION DE : module CORS, permettant d'éviter les erreurs relatives à l'origine de la requête 
var cors = require('cors');
//IMPORTATION DE : express
const express = require('express')
//Lancement de l'application express 
app = express()
//Utilisation du module CORS sur chacune des requêtes traitées 
app.use(cors());

console.log("--> Contenu de user - controllers/user.js")
console.log(User)

//Création de la fonction signup
exports.signup = (req, res, next) => {

    console.log("CONTENU DE : req.body (controllers/signup)")
    console.log(req.body)

    //PASSWORD HASH
    bcrypt.hash(req.body.password, 10) /* L'algo sera exécuté 10 fois*/
    .then((hash) =>{
        /*Création de la constante user, qui nous sert à créer un nouvel utilisateur selon 
        le modèle définit dans models/user*/
        const user = new User({
            email: req.body.email,
            password : hash
        })
        console.log("CONTENU DE : user")
        console.log(user)
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
console.log("CONTENU DE : req.body (controllers/login)")
console.log(req.body.email)

//First, we look into the database to know if the mail adress is already registered or not
User.findOne({email: req.body.email})
    .then((user) => {
        if(!user){
            return res.status(400).json({error : 'Unexistant User'})
        }

        //CONTROL THE PASSWORD 
        bcrypt.compare(req.body.password, user.password)
            .then((controlPassword) => {
                console.log('résultat de controlPassword :')
                console.log(controlPassword)

                //Si le controle nous retourne false 
                if(!controlPassword){
                    res.status(401).json({error : 'Le mot de passe est incorrect'})
                }

                res.status(200).json({message: "The password is correct"})
        })
            .catch((error) => res.status(500).json({error}))


        // res.status(200).json({message: "A similar mail adress has been found"})
    })
    .catch((error) => res.status(500).json({error}));

}

