//
const express = require("express");
const mongoose = require("mongoose");

//Importation du modèle de la BDD Mongo DB Atlas
const ModelSauce = require('../models/FicheSauce')

//
exports.createFicheSauce = (req, res, next) => {
    console.log("req.body provenant du fichier controllers/FicheSauce.js")
    console.log(req.body)

    //Ici, pas besoin d'utiliser un json.parse() pour le req.body.ModelSauce
    const sauceModelObject = req.body
    console.log("contenu de la const sauceModelObject du fichier controllers/FicheSauce.js")
    console.log(sauceModelObject)

    //La transformation au format JAVASCRIPT de l'objet présent dans la requête 
    const parsing = JSON.parse(req.body.sauce)
    console.log(parsing)

    //POUR FABRIQUER L'URL DE L'IMAGE 
    console.log("===> POUR FABRIQUER L'URL DE L'IMAGE")
    console.log(req.protocol);
    console.log(req.get("host"))
    console.log(req.file.filename)

    //L'instance ModelSauce
    const modelSauce = new ModelSauce({
        ...parsing,
        imageUrl: `${req.protocol}://${req.get("host")}/image/${req.file.filename}`
    });
    console.log("Contenu de modelSauce, ligne 21 du fichier controllers/FicheSauce.js")
    console.log(modelSauce)

    //Nous enregistrons l'objet au sein de la BDD
    modelSauce.save()
    .then(() => {
        res.status(201).json({
            message: 'Cette Sauce a bien été enregistrée dans la BDD',
            contenu: req.body
        })
    })
    .catch((error) => res.status(400).json(error))
};

exports.getAllSauce = (req, res, next) => {
    console.log("ModelSauce présent dans le module getAllSauce, ligne 28 du fichier controllers/FicheSauce.js")
    console.log(ModelSauce)
    //Affichage de toutes les sauces présentes dans la BDD
    ModelSauce
        .find()
        .then((allSauces) => res.status(200).json(allSauces))
        .catch((error) => res.status(400).json({error}))
}

exports.getOneSauce = (req, res, next) => { 
  
    ModelSauce.findOne({_id : req.params.id})
        .then((foundSauce) => res.status(200).json(foundSauce))
        .catch((error) => res.status(404).json({error}))
}

exports.updateOneSauce = (req, res, next) => {
    console.log("Contenu du corps de la requête de updateOneSauce (controllers/FicheSauce.js")
    console.log(req.body)
    console.log("Contenu du req.params.id de updateOneSauce")
    console.log(req.params.id)
    console.log({id : req.params.id})
    ModelSauce
        .updateOne({_id: req.params.id}, {...req.body})
        .then(()=> res.status(200).json({message: "Object has been updated"}))
        .catch(error => res.status(400).json({error}))
}

exports.deleteOneSauce = (req, res, next) => {
    console.log("Contenu du corps de la requête de deleteOneSauce (controllers/FicheSauce.js")
    console.log(req.body)
    console.log("Contenu du req.params.id de deleteOneSauce")
    console.log(req.params.id)
    console.log({id : req.params.id})
    ModelSauce
        .deleteOne({id: req.params.id})
        .then(()=> res.status(200).json({message: "Object has been deleted"}))
        .catch(error => res.status(400).json({error}))
}

