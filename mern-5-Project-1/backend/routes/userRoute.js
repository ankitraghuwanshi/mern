const express=require("express")
const userRouter=express.Router()

const { registerHandler, loginHandler } =require("../controllers/usersController")

userRouter.post('/register',registerHandler)

userRouter.post('/login',loginHandler)

module.exports = userRouter