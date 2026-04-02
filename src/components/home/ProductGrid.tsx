import { Link } from "react-router-dom";
import type { Product } from "../../types/models/Product";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[]
  loading?: boolean
  error?: string | null
  onAddToCart?: (product: Product) => void
};

const sortOptions = [
  "Sort by",
  "Price: Low to High",
  "Price: High to Low",
  "Top Rated"
];

const ProductGrid = ({ products, loading = false, error = null }: ProductGridProps) => {
  const previewProducts = products.slice(0, 8);

  return (
    <section className="rounded-4xl bg-white px-4 py-10 shadow-sm sm:px-6 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col gap-5 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Curated for you</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Featured products
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Discover top picks and confident essentials for modern workspaces.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
            >
              View All
            </Link>
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 shadow-sm">
              <label htmlFor="sort-products" className="sr-only">
                Sort products
              </label>
              <select id="sort-products" className="rounded-full bg-transparent text-sm font-medium outline-none">
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {['All', 'New arrivals', 'Best sellers', 'Top Rated'].map((label) => (
            <button
              key={label}
              type="button"
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-slate-300 hover:bg-slate-100"
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-4xl border border-slate-200 bg-slate-100 p-5">
                <div className="mb-4 h-56 rounded-3xl bg-slate-200" />
                <div className="space-y-3">
                  <div className="h-4 w-2/5 rounded-full bg-slate-200" />
                  <div className="h-4 w-4/5 rounded-full bg-slate-200" />
                  <div className="h-4 w-1/4 rounded-full bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-4xl border border-rose-200 bg-rose-50 px-6 py-8 text-rose-700">
            {error}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {previewProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid