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
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    }
}
const userSchema = new mongoose.Schema(userSchemaRules)
const UserModel=mongoose.model("users", userSchema)

module.exports={UserModel} 