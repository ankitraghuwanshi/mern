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
        minlength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}

const userSchema = new mongoose.Schema(userSchemaRules)

//pre-hook before saving in mongoDB 
userSchema.pre("save", function (next) {
    //console.log(this)
    //console.log(next)
    const isPasswordValid = !this.password.includes("password")
    const isConfirmValid = this.password === this.confirmPassword

    if(isPasswordValid && isConfirmValid) {
        next()
    } else {
        next(new Error("Error is saving user; Please check the input!"))
    }
})

userSchema.post('save', function (){
    console.log("user is saved to DB successfully")
})

const UserModel = mongoose.model("users", userSchema)

module.exports = { 
    UserModel
} 