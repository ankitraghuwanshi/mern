const express=require("express")
const userRouter=express.Router()

const { registerHandler, loginHandler } =require("../controllers/userController")

userRouter.post('/register',registerHandler)

userRouter.post('/login',loginHandler)

module.exports = userRouter