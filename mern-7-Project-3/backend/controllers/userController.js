const {UserModel} =require("../models/userModel")
var validator = require("email-validator") 
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const SALT_ROUNDS=12  //keep it between 10-15,depend on your pc

const registerHandler=async(req,res)=>{
    try {
        //email valid check using (npm i email-validator)
        const isEmailValid = validator.validate(req.body.email)
        if(!isEmailValid){
            return res.status(500).json({
                success: false,
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
                message: "no user found"
            })
        }

        //2.bcrypt method to compare password
        const isPasswordValid= await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordValid){
            return res.status(404).json({
                success: false,
                message: "no user with this password found"
            })
        }

        //start jwt signing process
        const token = jwt.sign(
            //first argument is the extra data stored in JWT
            {
                userId: user._id
            },
            //second argument is JWT_SECRET stored in .env file
            process.env.JWT_SECRET,
            //third argument is expiry of JWT
            {
                expiresIn: "1d"
            }
        )

        res.json({
            success: true,
            message: "successful logged in",
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getCurrentUserHandler = async function(req,res){
    try {
        //try to get req.body.userId from the request object
        const userId=req.userId

        //if userId not found then something went wrong
        if(!userId){
            return res.status(500).json({
                success:false,
                message: "something went wrong try"
            })
        }
        
        //user find by userId
        const user = await UserModel.findById(userId).select("-password")

        res.json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong catch"
        })
    }
}

module.exports={
    registerHandler,
    loginHandler,
    getCurrentUserHandler
}