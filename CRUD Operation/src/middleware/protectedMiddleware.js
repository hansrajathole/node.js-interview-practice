const jwt = require("jsonwebtoken")
const config = require("../config/config")
const userModel = require("../models/user.model")

 const protected = async function(req, res, next){
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        if(!token){
            return res.status(400).json({message : "Unauthorized : no token provided"})
        }

        const decode = await jwt.verify(token, config.JWT_SECREAT)

        const user = await userModel.findById(decode.id)

        if(!user){
            return res.status(400).json({message : "Unauthorized : token is invalid"})
        }

        req.user = user

        next()

    } catch (error) {
        console.log("error in verify user");
        return res.status(500).json({message : "error in verify user", error : error.message})
           
    }
}   

module.exports = protected