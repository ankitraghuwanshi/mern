const express=require("express")
const movieRouter=express.Router()

const {authMiddleware} = require("../middlewares/authMiddleware")

const {getAllMovieHandler,updateMovieHandler,addMovieHandler} =require("../controllers/movieController")

//add a movie
movieRouter.post('/add-movie',authMiddleware, addMovieHandler)

//get all movie
movieRouter.get('/get-all-movie',authMiddleware, getAllMovieHandler)

//get all movie
movieRouter.put('/update-movie',authMiddleware, updateMovieHandler)

module.exports = movieRouter