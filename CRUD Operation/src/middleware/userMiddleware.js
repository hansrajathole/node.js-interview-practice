const {body , check} = require("express-validator")


const registerValidator = [
    body('username')
        .isString()
        .withMessage("username must be in string")
        .isLength({min : 3}, {max : 20})
        .withMessage("username must be at least 3 character long and at most 20 character long"),   
    
   body("email")     
        .isEmail()
        .withMessage("email is invalid"),

    body("password")     
        .isString()
        .withMessage("password must be an string")
        .isLength({min : 6} , {max : 20})
        .withMessage("password must be at least 6 character and most 20 character long")
]

module.exports = registerValidator