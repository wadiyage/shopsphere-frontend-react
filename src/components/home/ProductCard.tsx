import { Link } from "react-router-dom"
import type { Product } from "../../types/models/Product";

const maxStars = 5

const renderStars = (rating: number) => {
  const fullStars = Math.min(Math.max(Math.round(rating), 0), maxStars);
  return Array.from({ length: maxStars }, (_, i) => (
    <svg
      key={i}
      className={`h-4 w-4 ${
        i < fullStars ? "text-yellow-400" : "text-gray-300"
      }`}
      viewBox="0 0 20 20"
      fill={i < fullStars ? "currentColor" : "none"}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286
           3.966a1 1 0 00.95.69h4.17c.969 0 1.371
           1.24.588 1.81l-3.37 2.45a1 1 0 00-.364
           1.118l1.287 3.966c.3.922-.755
           1.688-1.538 1.118l-3.37-2.45a1 1 0
           00-1.176 0l-3.37 2.45c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1
           1 0 00-.364-1.118L2.045 9.393c-.783-.57-.38-1.81.588-1.81h4.17a1
           1 0 00.95-.69l1.286-3.966z"
      />
    </svg>
  ))
}

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">

      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={`http://localhost:8080${product.imageUrl}`}
          alt={product.name}
          className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
          NEW
        </span>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <Link
            to={`/product/${product.id}`}
            className="px-4 py-2 bg-white text-black text-sm font-semibold rounded"
          >
            View Details
          </Link>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-indigo-600 font-medium mb-1 uppercase">
          {product.categoryName ?? "Category"}
        </span>

        <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center mb-2">
          <div className="flex">{renderStars(product.rating ?? 4)}</div>
          <span className="text-xs text-gray-500 ml-2">
            ({(product.rating ?? 4).toFixed(1)})
          </span>
        </div>
        <div className="mt-auto">
          <p className="text-lg font-bold text-gray-900">
            LKR. {product.price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="p-4 pt-0">
        <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition">
          Add to Cart
        </button>
      </div>
    </article>
  );
};