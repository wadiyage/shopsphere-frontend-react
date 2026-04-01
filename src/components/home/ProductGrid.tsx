import { Link } from "react-router-dom";
import type { Product } from "../../types/models/Product";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  loading?: boolean;
  error?: string | null;
};

const sortOptions = [
  "Sort by",
  "Price: Low to High",
  "Price: High to Low",
  "Top Rated",
];

const ProductGrid = ({ products, loading = false, error = null }: ProductGridProps) => {
  const previewProducts = products.slice(0, 8);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-4xl border border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">Curated for you</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Featured products
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Discover top picks, deals, and customer favorites hand-selected for this season.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
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
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-4xl border border-slate-200 bg-white p-5">
                <div className="mb-4 h-56 rounded-3xl bg-slate-200" />
                <div className="space-y-3">
                  <div className="h-4 w-3/5 rounded-full bg-slate-200" />
                  <div className="h-4 w-4/5 rounded-full bg-slate-200" />
                  <div className="h-4 w-2/5 rounded-full bg-slate-200" />
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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid