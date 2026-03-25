import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Welcome to Shopsphere</h1>
      <p className="mb-6">Your React + Spring Boot e-commerce application.</p>

      <h2 className="text-2xl font-semibold mb-2">Products</h2>
      <ul>
        <li>
          <Link to="/product/1" className="text-blue-500 underline">
            Product 1
          </Link>
        </li>
        <li>
          <Link to="/product/2" className="text-blue-500 underline">
            Product 2
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;