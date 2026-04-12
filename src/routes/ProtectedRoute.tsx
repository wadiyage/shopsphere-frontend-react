import { Navigate, useLocation, Outlet } from "react-router-dom"
import { isTokenExpired } from "../utils/jwt"

const ProtectedRoute = () => {
    const location = useLocation()
    const token = localStorage.getItem("token")

    if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token")

        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        )
    }

    return <Outlet />
}

export default ProtectedRoute