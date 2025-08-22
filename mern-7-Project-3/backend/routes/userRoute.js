const express=require("express")
const userRouter=express.Router()
const {authMiddleware} =require("../middlewares/authMiddleware")

const { registerHandler, loginHandler, getCurrentUserHandler } =require("../controllers/userController")

userRouter.post('/register',registerHandler)

userRouter.post('/login',loginHandler)

userRouter.get('/get-current-user',authMiddleware, getCurrentUserHandler)

module.exports = userRouter