//Import express et mongoose 
const express = require("express");
const mongoose = require("mongoose");

//Importation du modèle de la BDD Mongo DB Atlas
const ModelSauce = require('../models/FicheSauce')

//Middlewares Sauces
exports.createFicheSauce = (req, res, next) => {

    //Ici, pas besoin d'utiliser un json.parse() pour le req.body.ModelSauce
    const sauceModelObject = req.body

    //La transformation au format JAVASCRIPT de l'objet présent dans la requête 
    const parsing = JSON.parse(req.body.sauce);
    
    //L'instance ModelSauce
    const modelSauce = new ModelSauce({
        ...parsing,
        imageUrl: `${req.protocol}://${req.get("host")}/image/${req.file.filename}`
    });
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

//Affichage de toutes les sauces présentes dans la BDD
exports.getAllSauce = (req, res, next) => {
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
    ModelSauce
        .updateOne({_id: req.params.id}, {...req.body})
        .then(()=> res.status(200).json({message: "Object has been updated"}))
        .catch(error => res.status(400).json({error}))
}

exports.deleteOneSauce = (req, res, next) => {
    ModelSauce
        .deleteOne({id: req.params.id})
        .then(()=> res.status(200).json({message: "Object has been deleted"}))
        .catch(error => res.status(400).json({error}))
}

