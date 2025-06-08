const {validationResult} = require("express-validator")
const userModel = require("../models/user.model")


module.exports.registerController = async (req, res)=>{

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

        const hashedPassword = await userModel.hashedPassword(password)

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


module.exports.loginController = async (req, res) => {
    try {
        const {email , username , password} = req.body

        const errors = validationResult(res)
        if(!errors.isEmpty()){
            return res.status(400).json({message : errors.array()[0].msg})
        }

        if(!email && !username){
            return res.status(400).json({message : "username or email must be required"})
        }

        if(!password){
            return res.status(400).json({message : "password must be required"})
        }

        const user = await userModel.findOne({
            $or : [
                {email : email} , {username : username}
            ]
        }).select("+password")

        const isMatch = await user.comparePassword(password)
        
        if(!isMatch){
            return res.status(400).json({message : "incredencial error"})
        }

        const token = await user.generateAuthToken()
        delete user._doc.password
        res.status(200).json({message : "login successfully" , user , token})


    } catch (error) {
        console.log("error in login controller : ", error.message);
        res.status(500).json({
            message: "Error in loginController",
            error: error.message
        })
    }
}


module.exports.meController = async (req, res) => {
    try {
        const user = req.user
        if(!user){
            return res.status(400).json({message : "Unauthorized : user not found"})
        }

        res.status(200).json({message : "verified successfully" , user})
    } catch (error) {
        console.log("error in meController : ", error.message);
        return res.status(500).json({message : "error in meController : " , error : error.message})
    }
}