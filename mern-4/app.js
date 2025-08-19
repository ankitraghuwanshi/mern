//imports
const express = require("express")

const app = express()
app.use(express.json())

const dotenv=require("dotenv")
dotenv.config()
// It reads any .env file, converts them into JS object, stores them in process.env
//console.log({ env: process.env })

const { PORT }=process.env

//db config
const {connectDB} = require("./config/db")
connectDB()

//importing any model if required
const usersRouter = require("./routes/users")

//top-level api as url
//means all route start from /api
app.use('/api', usersRouter)

//for invalid url
//In build middleware that runs for any route not specified above
//catch-all route to indicate 404 error
app.use((req,res)=>{
    res.status(404).send("PAGE NOT FOUND")
})

app.listen(PORT ,()=>{
    console.log("application is started")
})  