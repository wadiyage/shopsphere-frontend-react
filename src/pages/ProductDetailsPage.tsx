import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';

interface Product {
  id: number
  name: string
  price: number
  description?: string
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (id) {
      getProductById(id).then((res) => {
        setProduct(res.data)
      }).catch((err) => {
        console.error("Error fetching product:", err)
      })
    }
  }, [id])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
      <p className="text-xl mb-4">Price: Rs. {product?.price.toFixed(2)}</p>
      <p className="mb-6">{product?.description ? product.description : "No description available"}</p>

      <Link to="/" className="text-blue-500 underline">
        Back to Home
      </Link>
    </div>
  );
};

export default ProductDetailsPage;