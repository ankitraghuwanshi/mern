import {axiosInstance} from './axios'

const registerUser = async(value) => {
    try {
        const response = await axiosInstance.post('/api/user/register', value)
        return response.data
    }catch (error) {
        //throw error
        console.log(error)
    }
}

const loginUser = async(value) => {
    try {
        const response = await axiosInstance.post('/api/user/login', value)
        return response.data
    }catch (error) {
        //throw error
        console.log(error)
    }
}

export {
    registerUser,
    loginUser
}