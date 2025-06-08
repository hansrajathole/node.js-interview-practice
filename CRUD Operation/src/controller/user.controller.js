const {validationResult} = require("express-validator")
const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
module.exports.userCreate = async (req, res)=>{

    const {username , email  , password} = req.body

    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message : errors.array()[0].msg})
        }

        if(!username){
            return res.status(400).json({message : "username is required"})
        }

        if(!email){
            return res.status(400).json({message : "email is required"})
        }

        if(!password){
            return res.status(400).json({message : "password is required"})
        }

        if(password.length < 6 && password.string().length > 20){
            return res.status(400).json({message : "password "})
        }

        const user = await userModel.findOne({
          $or: [
                {username : username},
                {email : email}
            ]
        })

        if(user){
            return res.status(400).json({message : "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await userModel.create({
            username,
            email,
            password : hashedPassword
        })

        res.status(201).json({message : "register successfully" , newUser})
        
        
    } catch (error) {
        console.log("error in register controller : ", error.message);
        res.status(500).json({
            message: "Error in userRegister",
            error: error.message
        })
    }

}