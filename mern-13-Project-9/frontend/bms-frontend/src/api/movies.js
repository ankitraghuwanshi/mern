import {axiosInstance} from './axios'

const addMovie = async(value) => {
    try {
        const response = await axiosInstance.post('/api/movies/add-movie', value)
        return response.data
    }catch (error) {
        // Optionally extract and throw a more readable error
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw error; // Fallback to original error
    }
}

const updateMovie = async(value) => {
    try {
        const response = await axiosInstance.put('/api/movies/update-movie', value)
        return response.data
    }catch (error) {
        // Optionally extract and throw a more readable error
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw error; // Fallback to original error
    }
}

const getAllMovies = async() => {
    try {
        const response = await axiosInstance.get('/api/movies/get-all-movie')
        return response.data
    }catch (error) {
        // Optionally extract and throw a more readable error
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw error; // Fallback to original error
    }
}

const getMovieById = async (id) => {
    try{
        const response = await axiosInstance.get(`/api/movies/movie/${id}`)
        return response.data;
    }catch(err){
        return err.response
    }
}


export {
    addMovie,
    updateMovie,
    getAllMovies,
    getMovieById
}