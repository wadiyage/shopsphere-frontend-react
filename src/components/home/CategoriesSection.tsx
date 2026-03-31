import type React from "react"

import { categories } from "../../data/categoriesData"
import type { Category } from "../../types/models/Category"

import { Link } from "react-router-dom"

const CategoriesSection: React.FC = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-2 mb-5">
                    <h2 className="text-2xl md:text-3xl font-bold uppercase text-gray-900">Shop by Category</h2>
                    <p className="text-xl font-light text-gray-600">Explore our wide range of industrial products</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category: Category) => (
                        <Link
                            key={category.id}
                            to={category.path}
                            className="group flex flex-col items-center text-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
                        >
                            <img 
                                src={category.img} 
                                alt={category.name}
                                className="w-40 h-60 object-cover rounded-full mb-2 group-hover:scale-105 transition-transform duration-300"    
                            />
                            <span className="text-lg font-medium uppercase text-gray-900 group-hover:text-blue-600">
                                {category.name}
                            </span>

                        </Link>

                    ))}
                </div>
            </div>
        </section>
    )
}

export default CategoriesSection