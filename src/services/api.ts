import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api"
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") //  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3YWRpeWFnZTIyMUBnbWFpbC5jb20iLCJpYXQiOjE3NzUyMzE2MTgsImV4cCI6MTc3NTIzNTIxOH0.xpAAlSbqqMY4L7rTfpyLw5XV1tPHD9zWzexhYdzinrE"
    if (token) {
        config.headers = config.headers || {}
        config.headers['Authorization'] = `Bearer ${token}`
    }

    config.headers = config.headers || {}
    config.headers['Content-Type'] = 'application/json'

    return config
})

API.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status
        const message = error.response?.data?.message || ""

        console.error("API Error: ", status, message)

        if (
            status === 401 ||
            status === 403 ||
            message.includes("JWT") ||
            message.includes("expired")
        ) {
            localStorage.removeItem("token")
            window.location.href = "/login"
        }

        return Promise.reject(error)
    }
)

export default API