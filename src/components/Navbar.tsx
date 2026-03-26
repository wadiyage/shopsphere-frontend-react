import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Shopsphere</h1>
      <div className="space-x-4">
        <Link to="/" className="hover: text-gray-300">Home</Link>
        <Link to="/cart" className="hover:text-gray-300">Cart</Link>
      </div>
    </nav>
  )
}

export default Navbar