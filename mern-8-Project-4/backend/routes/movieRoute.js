const express=require("express")
const movieRouter=express.Router()

const {getAllMovieHandler,updateMovieHandler,addMovieHandler} =require("../controllers/movieController")

//add a movie
movieRouter.post('/add-movie', addMovieHandler)

//get all movie
movieRouter.get('/get-all-movie', getAllMovieHandler)

//get all movie
movieRouter.put('/update-movie', updateMovieHandler)

module.exports = movieRouter