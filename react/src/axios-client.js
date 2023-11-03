import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`/api, 
})

axiosClient.interceptors.request.use(()=>{
    const token = localStorage.get('ACCESS_TOKEN');
    config.headers.Authorization =`Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use((response)=>{
    return response;
},()=>{}) 

export default axiosClient;