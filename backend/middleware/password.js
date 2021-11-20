const passwordCheking = require('../models/password')

module.exports = (req, res, next) =>{
    if(passwordCheking.validate(req.body.password)){
        return next()
    }
    else{
        return res.status(400).json({message : `Le mot de passe n'est pas assez fort ! Il devrait contenir entre 6 et 10 charactères, un symbol et au moins une majuscule, une minuscule et un chiffre.`})    
    }
}