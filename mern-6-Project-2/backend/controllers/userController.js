const {UserModel} =require("../models/userModel")
var validator = require("email-validator") 

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

        //create a new user object locally
        const user = new UserModel(req.body)
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
        //then checking if password is valid or not
        //basic method (this is bad method)
        if(req.body.password !== user.password){
            return res.status(404).json({
                success: false,
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