const mongoose = require("mongoose")

const userSchemaRules = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5 
    },
    role: {
        type: String,
        required: false,
        default: "User" //"Admin","Partner","User"
    },
    // New Otp fields added
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    }
}
const userSchema = new mongoose.Schema(userSchemaRules)
const UserModel=mongoose.model("users", userSchema)

module.exports={UserModel} 