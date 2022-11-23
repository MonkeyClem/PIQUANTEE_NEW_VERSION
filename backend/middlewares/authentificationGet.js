const jwt = require ('jsonwebtoken');

//exportation de la fonction du middleware
module.exports = (req, res, next) => {
   try{
    //Récupérer le token dans le headers authorization de la requête 
    console.log('-----> middleware AuthentificationGet')
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

    // /*Nous récupérons le userId qui se trouve dans le decodedToken afin de le 
    //   comparer avec le userId présent dans la requête */
      const userIdFromDecodedToken = decodedToken.userId
    // console.log("-----> contenue de userIdFromDecodedToken")
    // console.log(userIdFromDecodedToken)
    // console.log('-----> req.body.userId présent dans le corps de la requête')
    // console.log(req.body.userId)

    console.log('-----> console.log de req.originalUrl')
    console.log(req.originalUrl)
    console.log(req.rawHeaders)

    const add = req.originalUrl + '/:' + decodedToken.userId
    console.log(add)


    //Récupération de la string comprenant l'ID de l'User 
    userIdParamsUrl = add
    console.log("-----> userIdParamsUrl")
    console.log(userIdParamsUrl)
    userIdParamsUrl = userIdParamsUrl.split(":")[1];
    console.log("-----> userIdParamsUrl")
    console.log(userIdParamsUrl)

    // console.log("Le corps de la requête")
    // console.log(req.body)
    
    console.log("L'ID présent dans le token - - middleware AuthentificationGet ")
    console.log(userIdFromDecodedToken)
    //Nous injectons manuellement le userId au corps de la requête
    req.body.userId = userIdParamsUrl
    console.log('-----> req.body.userId présent dans le corps de la requête - middleware AuthentificationGet')
    console.log(req.body.userId)

    console.log(req.body)

    //Comparaison de l'userId présent dans la requête avec celui présent dans le Token 
      if(userIdFromDecodedToken === req.body.userId){
              console.log("Sauces Affichées")
              next()
        
      }else{    
              console.log("===> Req.body présent dans le Else")
              console.log("Erreur Authentification ROUTE GET")
              throw "Erreur lors de l'userId"
      }
   }catch(error){
    res.status(401).json({error})
   }
}

