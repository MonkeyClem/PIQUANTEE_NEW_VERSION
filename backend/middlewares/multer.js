//MULTER : Pour gérer les requête HTTP avec envoie de fichier 

//IMPORT OF : Multer
const multer = require ('multer')

//Le dictionnaire de MIME_TYPES (cela sert à définir les formats de fichiers qui seront acceptés)
const MIME_TYPES = {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpeg",
    "image/gif" : "gif",
    "image/png" : "png"
}

console.log(MIME_TYPES)

//La destination du fichier (répertoire) et génerer un nom de fichier unique 
const storage = multer.diskStorage({
    //La destination de stockage du fichier
     destination: (req, file, callback) => {
        callback(null, "image");
    },
    filename: (req, file, callback) => {
        //suppression des espaces pour une meilleur lisibilité du nom de fichier
        const name = file.originalname.split(" ").join("_")
        const extension = MIME_TYPES[file.mimetype];

        callback(null, name + "_" + Date.now());
    }
}
)
console.log("MULTER CONST STORAGE")
console.log(storage)

//Exportation 
module.exports = multer({storage}).single('image')

