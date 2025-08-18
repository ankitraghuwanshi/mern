const express = require("express")
const app = express()

const dotenv=require("dotenv")
const mongoose=require("mongoose")

dotenv.config()
// It reads any .env file, converts them into JS object, stores them in process.env
//console.log({ env: process.env })

const { PORT, DB_URL }=process.env

mongoose.connect(DB_URL)
.then(()=>{
    console.log("connected to our DATABASE")
})
.catch((err)=>{
    console.log(err)
})

//import model
const {UserModel} = require("./models/users")

//middleware
//this is in-built middleware
app.use(express.json())

//custom midleware
const authenticateMiddleware=(req,res,next)=>{
    
    if(req.headers.password ==="test"){
        //allow user to proceed
        next()
    }else{
        res.status(500).send("you are not authenticated")
    }
}

//post route (try use with postman)
app.post('/add-user', authenticateMiddleware, async (req,res)=>{
    try {
        const userDetails=req.body
        const user=await UserModel.create(userDetails)

        res.status(200).json({
            status: "success",
            message:"user created successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
})

//get route for all users
app.get('/users',async (req,res)=>{
    try {
        const users=await UserModel.find()

        if(users.length === 0){
            res.status(404).json({
                status: "failure",
                message: "NO USERS FOUND"
            })
        }

        res.status(200).json({
            status: "success",
            message:"all users find successfully",
            users
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
})

//get route for particular user
app.get('/users/:_id',authenticateMiddleware,async(req,res)=>{
    try {
        const user=await UserModel.findById(req.params._id)

        if(!user){
            res.status(404).json({
                status: "failure",
                message: "NO USER FOUND"
            })
        }

        res.status(200).json({
            status: "success",
            message:"particular user findById successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
})

//for invalid url
//In build middleware that runs for any route not specified above
//catch-all route to indicate 404 error
app.use((req,res)=>{
    res.status(404).send("PAGE NOT FOUND")
})

app.listen(PORT ,()=>{
    console.log("application is started")
}) 