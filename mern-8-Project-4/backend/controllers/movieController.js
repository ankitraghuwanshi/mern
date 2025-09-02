const { MovieModel } = require("../models/movieModel")

const addMovieHandler=async (req,res)=>{
    try {
        const movie = new MovieModel(req.body)
        await movie.save()

        res.status(200).json({
            success: true,
            message:"movie added"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Internal server error"
        }) 
    }
} 

const getAllMovieHandler=async (req,res)=>{
    try {
        const movies = await MovieModel.find()

        if(!movies){
            return res.status(404).json({
                success: false,
                message: "NO MOVIE FOUND"
            })
        }

        res.status(200).json({
            success: true,
            message:"movies fetched",
            movies
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Internal server error"
        }) 
    }
} 

const updateMovieHandler=async (req,res)=>{
    try {
        const movie = await MovieModel.findOneAndUpdate(req.body.movieId, req.body)

        res.status(200).json({
            success: true,
            message:"movies fetched",
            movie
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Internal server error"
        }) 
    }
} 


module.exports={ 
    getAllMovieHandler,
    addMovieHandler,
    updateMovieHandler
}