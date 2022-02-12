import axios from "axios"
const axiosInstance = axios.create({
  baseURL: "https://v2.convertapi.com/",
})
export default axiosInstance
