const jwt = require ('jsonwebtoken');

//exportation de la fonction du middleware
module.exports = (req, res, next) => {
   try{
    //Récupérer le token dans le headers authorization de la requête 
    console.log('-----> Middleware Auth')
    console.log(req)
    console.log('-----> req.headers du Middleware Auth')
    console.log(req.headers.authorization)

    console.log("-----> Token")
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)

    //Le décodage du token
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`)
    console.log("-----> Decoded Token")
    console.log(decodedToken)

    /*Nous récupérons le userId qui se trouve dans le decodedToken afin de le 
      comparer avec le userId présent dans la requête */
    const userIdFromDecodedToken = decodedToken.userId
    console.log("-----> contenue de userIdFromDecodedToken")
    console.log(userIdFromDecodedToken)
    console.log('-----> req.body.userId présent dans le corps de la requête')
    console.log(req.body.userId)

    //Comparaison des usersId
    if(req.body.userId && (req.body.userId === userIdFromDecodedToken)){
        next()
    }
    else{
        throw 'UserId non valide'
    }

    //Passage au middleware suivant
   }
   catch(error){
    res.status(401).json({error})
   }
}

