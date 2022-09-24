//IMPORT DE : module express, que nous stockons dans la constante app
const express = require('express');
//Pour créer une application express
const app = express();
//IMPORT DE : module CORS, permettant d'éviter les erreurs relatives à l'origine de la requête 
const cors = require('cors');
//IMPORT DE : mongoose
const mongoose = require('mongoose');
//IMPORT DE : Routes 
const userRoutes = require("./routes/user")
const bodyParser = require('body-parser')
app.use(cors())

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
//   });

console.log("Test")

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
//     console.log("Premier middle")
//     res.json({message: "Voici la réponse serveur"})
//     next()
//   }
// )

app.use(bodyParser.json())

//LA ROUTE D'AUTHENTIFICATION
app.use('/api/auth/', userRoutes);

//MODULE EXPORTATION
module.exports = app;