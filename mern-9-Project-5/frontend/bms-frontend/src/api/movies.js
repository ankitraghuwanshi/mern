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

export {
    addMovie,
    updateMovie,
    getAllMovies
}