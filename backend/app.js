//IMPORT DE : module express, que nous stockons dans la constante app afin de créer une application express
const express = require('express');
const app = express();

//IMPORT DE : module CORS, permettant d'éviter les erreurs relatives à l'origine de la requête 
const cors = require('cors');
//Lorsque une requête est envoyée, le module CORS est systématiquement utilisé. 
app.use(cors());


//IMPORT DE : Routes 
const userRoutes = require("./routes/user");
const FicheSauceRoutes = require("./routes/FicheSauce");

//IMPORT DE : body-parser
const bodyParser = require('body-parser');

//IMPORT DE : Mongoose
const mongoose = require('mongoose');

//Connection to MongoDB Database 
mongoose.connect('mongodb+srv://clement:clem@piquantee.nl0h7sg.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log(error + 'Connexion à MongoDB échouée !'));


// app.use((req, res, next) => {
//   console.log('Requête reçue !')
//   next()
// });

// app.use((req, res, next) => {
//     res.status(201)
//     console.log("Premier middleware")
//     res.json({message: "Voici la réponse serveur"})
//     next()
//   }
// )

app.use(bodyParser.json());

//LA ROUTE D'AUTHENTIFICATION
app.use('/api/auth/', userRoutes);

//LA ROUTE DE LA FICHE SAUCE
app.use('/api/' , FicheSauceRoutes);

//Utilisation de l'application static afin de gérer l'enregistrement des fichiers aux formats image
const path = require('path')
app.use('/image', express.static(path.join(__dirname, 'image')));

//EXPORTATION DU MODULE 
module.exports = app;