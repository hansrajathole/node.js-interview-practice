const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

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

// Hash password before saving
userSchema.statics.hashedPassword = async function (password) {
    const hashedPassword = bcrypt.hash(password,10)
    return hashedPassword
};

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token method
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { 
            id: this._id, 
            username: this.username, 
            email: this.email 
        },
        config.JWT_SECREAT
    );
};

const userModel = mongoose.model("User",userSchema)
module.exports = userModel