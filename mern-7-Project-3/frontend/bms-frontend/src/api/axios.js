import axios from 'axios'

//sending a token from frontent to backend
// "Bearer xxxxxxxxxxxxxxxxxx"

export const axiosInstance = axios.create({
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    baseURL: "http://localhost:3000"
})
