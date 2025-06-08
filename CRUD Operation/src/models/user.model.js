const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        minLength : [3 , "username must be atleast 3 character"],
        maxLength : [20 , "username must be most 20 character"]
    },
    email : {
        type : String,
        required : true,
        unique : true,
        minLength : [6 , "email must be atleast 6 character"],
        maxLength : [50 , "email must be most 50 character"],
        trim : true
    },
    password : {
        type : String,
        minLength : [6 , "password must be at least 6 character long"],
        required : true,
        select : false
    }
})

const userModel = mongoose.model("User",userSchema)
module.exports = userModel