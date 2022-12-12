const jwt = require ('jsonwebtoken');
// const bodyParser = require('body-parser')
// app.use(bodyParser.json())
//exportation de la fonction du middleware
module.exports = (req, res, next) => {
   try{
    //Récupérer le token dans le headers authorization de la requête 
    // console.log('-----> Middleware Auth')
    // console.log(req.rawHeaders)
    // console.log('-----> Req ')
    // console.log(req.body)
    // console.log('-----> req.headers.authorization du Middleware Auth')
    // console.log(req.headers.authorization)

    // console.log("-----> Token")
    const token = req.headers.authorization.split(" ")[1]
    // console.log(token)

    //Le décodage du token
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`)
    // // console.log("-----> Decoded Token")
    // console.log(decodedToken)

    // // console.log("contenu de req suite au decodedToken (middleware auth)");
    // // console.log(req)
    // // console.log("contenu de req.body suite au decodedToken (middleware auth)");
    // // console.log(req.body)

    /*Nous récupérons le userId qui se trouve dans le decodedToken afin de le 
      comparer avec le userId présent dans la requête */
    const userIdFromDecodedToken = decodedToken.userId
    // console.log("-----> contenue de userIdFromDecodedToken")
    // console.log(userIdFromDecodedToken)
    // console.log('-----> req.body.userId présent dans le corps de la requête')
    // console.log(req.body.userId)
    const userId = decodedToken.userId;
    req.auth = {
        userId: userId
    };
    console.log(req.auth)
    // // console.log('-----> console.log de req.originalUrl')
    // console.log(req.originalUrl)

    //Récupération de la string comprenant l'ID de l'User 
    // userIdParamsUrl = req.originalUrl.split("=")[1];
    // // console.log("-----> userIdParamsUrl")
    // // console.log(userIdParamsUrl)

    // console.log(" ===================> Le corps de la requête")
    // console.log(req.body)
    // req.body.userId = userIdFromDecodedToken 
    
    // // console.log("L'ID présent dans le token")
    // // console.log(userIdFromDecodedToken)
    // const decodedTokenFromBearer = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`)
    // // console.log(decodedTokenFromBearer)

   
    // req.body.userId = userIdFromDecodedToken

    // // console.log('-----> req.body.userId présent dans le corps de la requête')
    // // console.log(req.body.userId)
    // // console.log(req.headers)

    // //Comparaison de l'userId présent dans la requête avec celui présent dans le Token 
    if(req.auth.userId === userIdFromDecodedToken){
      next()
    }else{
      throw "userId non valide"
    }
    
    //   if(req.body.userId){
    // //     console.log('-----> req.body.userId présent dans le corps de la requête')
    // //     console.log(req.body.userId)
    // //     console.log("L'ID présent dans le token")
    // //     console.log(userIdFromDecodedToken)
    //         if(req.body.userId === userIdFromDecodedToken){
    //           next()
    //         }
    //         else{
    // //           console.log(req.body)
    // //           console.log("Erreur Authentification Body Raw")
    //           throw "Erreur lors de l'Authentification du l'userId"
    //       }
    //   }else if( userIdParamsUrl === userIdFromDecodedToken){
    //     next()
    //   }else { 
    //     throw 'Error authentification'
    //     }
   }catch(error){
    res.status(401).json({error})
   }
}

