import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api"
})

API.interceptors.request.use((config) => {
    const token =  localStorage.getItem("token")//  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3YWRpeWFnZTIyMUBnbWFpbC5jb20iLCJpYXQiOjE3NzUyMzE2MTgsImV4cCI6MTc3NTIzNTIxOH0.xpAAlSbqqMY4L7rTfpyLw5XV1tPHD9zWzexhYdzinrE"
    console.log("Attaching token to request:", token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const login = async (email: string, password: string) => {
    const res = await API.post("/auth/login", { email, password })

    localStorage.setItem("token", res.data.token)
    return res
}

export default API;