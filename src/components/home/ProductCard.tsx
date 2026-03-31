import { Link } from "react-router-dom"
import type { Product } from "../../types/Product";

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

export const ProductCard = ({ product}: { product: Product }) => {
    return (
        <article
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 ease-out overflow-hidden flex flex-col"
            >
              <Link
                to={`/product/${product.id}`}
                className="group h-full flex flex-col"
              >
                <figure className="relative w-full h-84 overflow-hidden bg-gray-100">
                  <img
                    src={`http://localhost:8080${product.imageUrl}`}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
                    loading="lazy"
                    aria-label={`${product.name} image`}
                  />
                </figure>

                <div className="p-4 flex-1 flex flex-col">
                  <span className="inline-block text-xs font-medium text-indigo-700 tracking-wide mb-1">
                    {product.categoryName ?? "All categories"}
                  </span>

                  <h2 className="text-base md:text-lg font-semibold text-slate-900 leading-snug mb-2">
                    {product.name}
                  </h2>

                  {product.description && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center mb-3 mt-auto">
                    <div className="flex items-center gap-0.5">
                      {renderStars(product.rating ?? 4)}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                      ({(product.rating ?? 4).toFixed(1)})
                    </span>
                  </div>

                  <p className="text-xl font-bold text-slate-900 mb-4">
                    ₹ {product.price.toFixed(2)}
                  </p>
                </div>
              </Link>

              <div className="p-4 border-t border-gray-100">
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            </article>
    )
}

export default ProductCard