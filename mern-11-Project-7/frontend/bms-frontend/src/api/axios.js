import axios from 'axios'

//sending a token from frontent to backend
// "Bearer xxxxxxxxxxxxxxxxxx"
const token=localStorage.getItem("token")

const axiosInstance = axios.create({
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    baseURL: "http://localhost:3000"
})

export{
    axiosInstance
}

// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:3000",
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // 🔁 Interceptor to attach latest token before every request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export { axiosInstance };