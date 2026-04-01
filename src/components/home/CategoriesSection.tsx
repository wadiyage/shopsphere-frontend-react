import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/categoryService";
import type { Category } from "../../types/models/Category";

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories()
            .then((res) => {
                setCategories(res.data)
            })
            .catch((err) => {
                console.error("Error fetching categories:", err)
            })
    }, [])

    return (
        <section className="rounded-4xl bg-slate-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 sm:flex sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">Shop by category</p>
                        <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                            Explore curated product categories.
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                            Discover category collections designed for every trade, workflow, and industrial need.
                        </p>
                    </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/products?category=${encodeURIComponent(category.name)}`}
                            className="group overflow-hidden rounded-[1.75rem] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative overflow-hidden aspect-4/3">
                                <img 
                                    src={`http://localhost:8080${category.imageUrl}`}
                                    alt={category.name}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
                            </div>
                            <div className="space-y-3 p-5">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600">
                                    Category
                                </span>
                                <h3 className="text-xl font-semibold text-slate-900">{category.name}</h3>
                                <p className="text-sm leading-6 text-slate-600 line-clamp-3">
                                    {category.description ?? "Browse top-rated items and shop with confidence."}
                                </p>
                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600">
                                    Browse collection
                                    <span aria-hidden="true">→</span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CategoriesSection