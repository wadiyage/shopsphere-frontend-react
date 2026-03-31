import React, { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { getProducts } from "../services/productService";
import ProductGrid from "../components/home/ProductGrid";
import HeroCarousel from "../components/home/HeroCarousel";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then((res) => {
        const data: Product[] = Array.isArray(res.data) ? res.data : [];

        setProducts(
          data.map((p) => ({
            ...p,
            rating: p.rating ?? Math.random() * 2 + 3.5,
          }))
        );
      })
      .catch(() => {
        setError("Failed to load products. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 min-h-[60vh] flex flex-col items-center justify-center">
        <div
          role="status"
          className="text-center text-gray-600 animate-pulse"
          aria-live="polite"
        >
          <div className="h-4 w-52 bg-gray-200 rounded mb-3 mx-auto" />
          <div className="h-4 w-40 bg-gray-200 rounded mb-3 mx-auto" />
          <div className="h-4 w-32 bg-gray-200 rounded mx-auto" />
          <p className="mt-3 text-sm">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }
  return (
    <section>
      <HeroCarousel />
      <ProductGrid products={products} />
      
    </section>
  );
};

export default HomePage;