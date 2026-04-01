import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/categoryService";
import type { Category } from "../../types/models/Category";

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  return (
    <section className="rounded-[2rem] bg-slate-50 px-4 py-12 shadow-sm sm:px-6 sm:py-14">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Shop by category</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Explore curated categories.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            A simplified collection of the products your team needs for reliable daily performance.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative overflow-hidden aspect-[5/4] bg-slate-100">
                <img
                  src={`http://localhost:8080${category.imageUrl}`}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/35 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-950">{category.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">
                  {category.description ?? "Shop the latest selections with calm, confident style."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection