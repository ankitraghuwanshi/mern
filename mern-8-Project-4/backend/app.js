const express = require("express")
const app =express()
var cors = require('cors')
//.env file use
const dotenv = require('dotenv')
dotenv.config()
//process.env contain .env data

// Add in middleware to handle request body as JSON
app.use(express.json())
app.use(cors())

//registering root level route
const userRouter = require("./routes/userRoute")
app.use('/api/user', userRouter)

//DATABASE
//note:- after dotenv.config() because process.env uses for DB_URL
const {connectDB}=require("./config/db")
connectDB()


app.listen(process.env.PORT, ()=>{
    console.log('backend application started')
})