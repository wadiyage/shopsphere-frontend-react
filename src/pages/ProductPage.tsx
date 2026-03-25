import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Product {id}</h1>
      <p className="mb-6">Details for product {id}.</p>
      <Link to="/" className="text-blue-500 underline">Back to Home</Link>
    </div>
  );
};

export default ProductPage;