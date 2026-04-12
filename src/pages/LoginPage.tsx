import React, { useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"

import { login } from "../services/authService"


import { toast } from "react-toastify"
import { useAuth } from "../context/AuthContext"


import ShoppingExperience from "../assets/images/auth/stephen-andrews-Cn4Hyb4nW5I-unsplash.jpg"

import logo from "../assets/logo/shopsphere.png"

interface FormErrors {
    email?: string
    password?: string
}

export const LoginPage = () => {
    const { loginUser } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const location = useLocation()
    const from =location.state?.from?.pathname || "/"

    const validate = (): boolean => {
        const newErrors: FormErrors = {}
        if (!email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address"
        }
        if (!password) {
            newErrors.password = "Password is required"
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        setLoading(true)

        try {
            const res = await login(email, password)

            loginUser(res.data.token, {
                email: email
            })

            toast.success("Logged in successfully!")
            navigate(from, { replace: true })
        } catch (error) {
            console.error("Login failed", error)
            toast.error("Invalid email or password!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="lg:flex">
                    <div className="lg:w-1/2 relative hidden lg:block">
                        <img
                            src={ShoppingExperience}
                            alt="Shopping Experience"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </div>

                    <div className="lg:w-1/2 p-8 lg:p-12">
                        <div className="max-w-md mx-auto">
                            <div className="flex items-center gap-4">
                                <NavLink to="/" className="flex items-center gap-3 rounded-2xl">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-white/10 shadow-sm shadow-slate-950/10">
                                        <img src={logo} alt="ShopSphere" className="h-8 w-auto" />
                                    </div>
                                </NavLink>
                            </div>
                            <div className="mt-5">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Welcome back
                                </h2>
                                <p className="text-base font-light font-stretch-expanded text-gray-500 mt-2 mb-8">
                                    Sign in to continue your shopping experience
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoFocus
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.email ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.password ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition duration-200"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? (
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                </svg>
                                            ) : (
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input type="checkbox" className="mr-2" />
                                        Remember me
                                    </label>
                                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline transition duration-200">
                                        Forgot your password?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !email || !password}
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Logging in...
                                        </div>
                                    ) : (
                                        "Login"
                                    )}
                                </button>

                                <div className="text-left">
                                    <p className="text-sm text-gray-600">
                                        Don't have an account?{" "}
                                        <NavLink to="/register" className="text-blue-600 hover:text-blue-800 focus:outline-none focus:underline transition duration-200 font-medium">
                                            Sign up
                                        </NavLink>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}