import { Link } from "react-router-dom"
import logo from "../assets/shopsphere.png"

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">

      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="ShopSphere Logo" className="w-12 h-12 object-contain" />
        <span className="text-xl font-bold">Shopsphere</span>
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover: text-gray-300">Home</Link>
        <Link to="/cart" className="hover:text-gray-300">Cart</Link>
      </div>
    </nav>
  )
}

export default Navbar