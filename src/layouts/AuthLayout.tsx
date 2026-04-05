import { Outlet } from "react-router-dom"
import AuthFooter from "../components/auth/AuthFooter"

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-100">
        <main className="flex flex-col items-center justify-center">
            <div className="h-[calc(100vh-90px)] flex items-center justify-center">
                <Outlet />
            </div>
        </main>
        <AuthFooter />
    </div>
  )
}

export default AuthLayout