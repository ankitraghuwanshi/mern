const {UserModel} =require("../models/userModel")
var validator = require("email-validator") 
const bcrypt = require("bcryptjs")

const SALT_ROUNDS=12  //keep it between 10-15,depend on your pc

const registerHandler=async(req,res)=>{
    try {
        //email valid check using (npm i email-validator)
        const isEmailValid = validator.validate(req.body.email)
        if(!isEmailValid){
            return res.status(500).json({
                success: false,
                notValidEmail: true,
                message: "please enter valid email"
            })
        }

        //find if user is present with same email
        const isUserPresent = await UserModel.findOne({
            email: req.body.email
        })
        if(isUserPresent){
            return res.status(500).json({
                success: false,
                emailTaken: true,
                message: "Email already taken"
            })
        }

        //create a new user object locally
        const user = new UserModel(req.body)

        //generating salt and hashing our password
        const salt = await bcrypt.genSalt(SALT_ROUNDS)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //console.log({hashedPassword})
        user.password=hashedPassword

        //then save it to DATABASE
        await user.save()

        res.json({
            success: true,
            message: "registration is successful",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const loginHandler=async function(req,res){
    try {
        //create a new user object locally
        const user = await UserModel.findOne({
            email : req.body.email
        })

        if(!user){
            return res.status(404).json({
                success: false,
                noUser: true,
                message: "no user found"
            })
        }

        //2.bcrypt method
        const isPasswordValid= await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordValid){
            return res.status(404).json({
                success: false,
                invalidPassword: true,
                message: "no user with this password found"
            })
        }

        res.json({
            success: true,
            message: "successful logged in",
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports={
    registerHandler,
    loginHandler
}