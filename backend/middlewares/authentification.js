const jwt = require ('jsonwebtoken');

//exportation de la fonction du middleware
module.exports = (req, res, next) => {
   try{
    //Récupérer le token dans le headers authorization de la requête 
    const token = req.headers.authorization.split(" ")[1]

    //Le décodage du token
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`)
 
    /*Nous récupérons le userId qui se trouve dans le decodedToken afin de le 
      comparer avec le userId présent dans la requête */
    const userIdFromDecodedToken = decodedToken.userId
  
    const userId = decodedToken.userId;
    req.auth = {
        userId: userId
    };

    // //Comparaison de l'userId présent dans la requête avec celui présent dans le Token 
    if(req.auth.userId === userIdFromDecodedToken){
      next()
    }else{
      throw "userId non valide";
    }
    
   }catch(error){
    res.status(401).json({error});
   }
}

