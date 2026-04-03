import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/api"
import { toast } from "react-toastify"

export const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await login(email, password)
            console.log("Login successful, token: ", res.data.token)

            toast.success("Logged in successfully!")
            navigate("/")
        } catch (error) {
            console.error("Login failed", error)
            toast.error("Invalid email or password!")
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/60"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/60"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>
        </div>
    )
}