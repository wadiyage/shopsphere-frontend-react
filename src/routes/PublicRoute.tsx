import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const PublicRoute = () => {
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/"

    if(isAuthenticated) {
        return <Navigate to={from} replace />
    }

    return <Outlet />
}

export default PublicRoute