import { Link } from "react-router-dom"

const AuthFooter = () => {
    return (
        <footer className="bg-slate-950 text-slate-400 py-4">
            <div className="text-slate-500 flex flex-col items-center gap-2 text-sm">
                    <div className="mt-4 flex flex-wrap justify-center gap-4 sm:mt-0">
                        <Link to="/legal" className="hover:text-white transition duration-200">
                            Privacy Policy
                        </Link>
                        <Link to="/privacy" className="hover:text-white transition duration-200">
                            Terms of Service
                        </Link>
                    </div>
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} ShopSphere. All rights reserved.
                    </p>
                </div>
        </footer>
    )
}

export default AuthFooter