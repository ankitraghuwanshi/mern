const express=require("express")
const movieRouter=express.Router()

const {authMiddleware} = require("../middlewares/authMiddleware")

const {getAllMovieHandler,updateMovieHandler,addMovieHandler} =require("../controllers/movieController")

//add a movie
movieRouter.post('/add-movie',authMiddleware, addMovieHandler)

//get all movie
movieRouter.get('/get-all-movie',authMiddleware, getAllMovieHandler)

//update movie
movieRouter.put('/update-movie',authMiddleware, updateMovieHandler)

// List all movies by searchText
movieRouter.get("/get-all-movies-by-search-text/:text", authMiddleware, async (req, res) => {
    try {
        if (req.params.text && req.params.text !== "undefined") {
            const movies = await Movie.find({ "movieName": { "$regex": req.params.text, "$options": "i" }})

            res.send({
                success: true,
                message: "Movies fetched!",
                movies
            })
        } else {
            const movies = await Movie.find()
            res.send({
                success: true,
                message: "Movies fetched!",
                movies
            })
        }
    } catch(e) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
})

module.exports = movieRouter