import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';

interface Product {
  id: number
  name: string
  description: string
  price: number
  stockQuantity: number
  imageUrl: string
  categoryName: string
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
      .then((res) => {
        console.log("API RESPONSE:", res.data)
        setProducts(res.data)
      })
      .catch((err) => {
        console.error("Error fetching products:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className='text-xl'>Loading products...</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Welcome to Shopsphere</h1>
      <p className="mb-6">Your React + Spring Boot e-commerce application.</p>

      <h2 className="text-3xl font-bold mb-6">Products</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className='border p-4 rounded-lg shadow hover:shadow-lg transition'
          >
            <h2 className='text-xl font-semibold'>{product.name}</h2>
            <p className='text-gray-600'>Rs. {product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;