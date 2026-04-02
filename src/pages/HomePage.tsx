import React, { useEffect, useState } from "react";
import type { Product } from "../types/models/Product";
import { getProducts } from "../services/productService";
import HeroCarousel from "../components/home/HeroCarousel";
import CategoriesSection from "../components/home/CategoriesSection";
import PromoBanner from "../components/home/PromoBanner";
import ProductGrid from "../components/home/ProductGrid";
import NewsletterSection from "../components/home/NewsletterSection";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then((res) => {
        const data: Product[] = Array.isArray(res.data) ? res.data : [];

        setProducts(
          data.map((product) => ({
            ...product,
            rating: product.rating ?? Math.min(5, Math.max(3.5, Math.random() * 2 + 3.5)),
          }))
        );
      })
      .catch(() => {
        setError("Failed to load products. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-slate-50 text-slate-900">
      <HeroCarousel />

      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-16">
        <CategoriesSection />
        <PromoBanner />
        <ProductGrid 
          products={products} 
          loading={loading} 
          error={error}
        />
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
        <NewsletterSection />
      </section>
    </main>
  )
}

export default HomePage;