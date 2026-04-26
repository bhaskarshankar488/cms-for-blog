import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // 🔥 REQUIRED for session cookies
})

export default axiosInstance