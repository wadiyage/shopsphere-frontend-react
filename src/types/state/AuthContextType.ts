import type { User } from "../models/User"

export interface AuthContextType {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    
    loginUser: (token: string, user: User) => void
    logout: () => void
}