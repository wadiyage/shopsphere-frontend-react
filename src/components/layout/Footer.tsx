import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-gray-300 mt-12">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-xl font-bold text-white mb-3">ShopSphere</h2>
                    <p className="text-sm text-gray-400">
                        Your trusted platform for industrial and electronic products.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="text-sm hover:text-white transition">Home</Link></li>
                        <li><Link to="/products" className="text-sm hover:text-white transition">Products</Link></li>
                        <li><Link to="/" className="text-sm hover:text-white transition">Categories</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-white mb-3 uppercase">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="text-sm hover:text-white transition">Help Center</Link></li>
                        <li><Link to="/" className="text-sm hover:text-white transition">Contact Us</Link></li>
                        <li><Link to="/" className="text-sm hover:text-white transition">Privacy Policy</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-white mb-3 uppercase">Contact</h3>
                    <p className="text-sm text-gray-400">
                        Email: support@shopsphere.com
                    </p>
                    <p className="text-sm text-gray-400">
                        Phone: (+94) 77 80 51 829
                    </p>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} ShopSphere. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer