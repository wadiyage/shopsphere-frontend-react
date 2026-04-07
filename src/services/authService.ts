import API from "./api"

export const login = async (email: string, password: string) => {
    return await API.post("/auth/login", { email, password })
}

export const register = async (firstName: string, lastName: string, email: string, password: string) => {
    return await API.post("/auth/register", { firstName, lastName, email, password })
}