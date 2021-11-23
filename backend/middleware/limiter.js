const loginLimiter = require('express-rate-limit')
const limiterSchema = new loginLimiter({
    windowMs:60 * 60 * 1000, // 60 minutes
  max: 5, // limit each IP to 3 requests per windowMs
  message: "Vous avez essayé de vous connecter un trop grand nombre de fois, veuillez attendre 1 heures pour tenter un nouvel essai.",
 


})



module.exports  =("limiter", limiterSchema)
