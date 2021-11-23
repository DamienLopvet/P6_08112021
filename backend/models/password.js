const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();
passwordSchema
.is().min(6)                                    // Minimum length 8
.is().max(12)                                  // Maximum length 12
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()    
.has().symbols()
.has().not().symbols(2)
.has().not().spaces() 

module.exports = ("passwordCheking", passwordSchema)

 