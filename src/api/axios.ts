import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://blog-backend-for-cms-3.onrender.com/api",
  withCredentials: true, // 🔥 REQUIRED for session cookies
})

export default axiosInstance