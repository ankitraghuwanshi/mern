// Schema -> structure & validation

const mongoose = require("mongoose")

// Setting up rules for our schema

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
        minlength: 8
    },
    // This can  be done in backend validation as well
    // Without storing the field
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        validate: function() {
            return this.password === this.confirmPassword
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}

const userSchema = new mongoose.Schema(userSchemaRules)

const UserModel = mongoose.model("users", userSchema)

module.exports = { 
    UserModel
}