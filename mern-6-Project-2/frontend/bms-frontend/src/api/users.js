import {axiosInstance} from './axios'

const registerUser = async(value) => {
    try {
        const response = await axiosInstance.post('/api/user/register', value)
        return response.data
    }catch (error) {
        // Optionally extract and throw a more readable error
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw error; // Fallback to original error
    }
}

const loginUser = async(value) => {
    try {
        const response = await axiosInstance.post('/api/user/login', value)
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
    registerUser,
    loginUser
}