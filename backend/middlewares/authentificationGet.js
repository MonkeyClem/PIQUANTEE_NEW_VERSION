const jwt = require ('jsonwebtoken');

//exportation de la fonction du middleware
module.exports = (req, res, next) => {
   try{
    
    console.log(req.body)
    /*Nous extrayons le token du header Authorization de la requête entrante. Ce dernier contiendra également 
    le mot-clé Bearer. nous utilisons donc la fonction split pour tout récupérer après l'espace dans le header*/
    //console.log("-----> Token")
    const token = req.headers.authorization.split(" ")[1]

    //Nous utilisons ensuite la fonction verify pour décoder notre token. Si celui-ci n'est pas valide, une erreur sera générée.
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`)
  

    /* Nous récupérons le userId qui se trouve dans le decodedToken afin de le 
       comparer avec le userId présent dans la requête */
      const userIdFromDecodedToken = decodedToken.userId

    // //console.log("-----> contenue de userIdFromDecodedToken")
    // //console.log(userIdFromDecodedToken)
      
    console.log('-----> req.body de la requête')
    console.log(req.body)
    console.log('-----> req.body.userId présent dans le corps de la requête')
    console.log(req.body.userId)

    //console.log('-----> //console.log de req.originalUrl')
    //console.log(req.originalUrl)
    //console.log(req.rawHeaders)

//     const add = req.originalUrl + '/:' + decodedToken.userId
    //console.log(add)


    //Récupération de la string comprenant l'ID de l'User 
//     userIdParamsUrl = add
    //console.log("-----> userIdParamsUrl")
    //console.log(userIdParamsUrl)
//     userIdParamsUrl = userIdParamsUrl.split(":")[1];
    //console.log("-----> userIdParamsUrl")
    //console.log(userIdParamsUrl)

    // //console.log("Le corps de la requête")
    // //console.log(req.body)
    
    //console.log("L'ID présent dans le token - - middleware AuthentificationGet ")
    //console.log(userIdFromDecodedToken)
    //Nous injectons manuellement le userId au corps de la requête
//     req.body.userId = userIdParamsUrl
    //console.log('-----> req.body.userId présent dans le corps de la requête - middleware AuthentificationGet')
    //console.log(req.body.userId)

    //console.log(req.body)

    //Comparaison de l'userId présent dans la requête avec celui présent dans le Token 
      if(userIdFromDecodedToken === req.body.userId){
              console.log("Sauces Affichées")
              next()
        
      }else{    
              //console.log("Erreur Authentification ROUTE GET")
              throw "Erreur lors de l'userId"
      }
   }catch(error){
    res.status(401).json({error})
   }
}

