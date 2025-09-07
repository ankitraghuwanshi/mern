const express = require("express")
const app =express()
var cors = require('cors')
//.env file use
const dotenv = require('dotenv')
dotenv.config()
//process.env contain .env data

const userRouter = require("./routes/userRoute")
const movieRouter = require("./routes/movieRoute")
const theatreRouter = require("./routes/theatreRoute")
const showRouter = require("./routes/showRoute")

// Add in middleware to handle request body as JSON
app.use(express.json())
app.use(cors())

//registering root level route for user
app.use('/api/user', userRouter)

//registering root level route for movie
app.use('/api/movies', movieRouter)

//registering root level route for theatre
app.use('/api/theatres', theatreRouter)

//registering root level route for theatre
app.use('/api/shows', showRouter)

//DATABASE
//note:- after dotenv.config() because process.env uses for DB_URL
const {connectDB}=require("./config/db")
connectDB()


app.listen(process.env.PORT, ()=>{
    console.log('backend application started')
})

// Homeworks
// Implement the Delete modal for both movies and Theatres
// While populating owners on theatres, we only want to get the name field, not others