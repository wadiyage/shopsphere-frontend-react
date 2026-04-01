import { Link } from "react-router-dom";
import type { Product } from "../../types/models/Product";

const maxStars = 5;

const renderStars = (rating: number) => {
  const fullStars = Math.min(Math.max(Math.round(rating), 0), maxStars);
  return Array.from({ length: maxStars }, (_, i) => (
    <svg
      key={i}
      className={`h-4 w-4 ${i < fullStars ? "text-amber-400" : "text-slate-300"}`}
      viewBox="0 0 20 20"
      fill={i < fullStars ? "currentColor" : "none"}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118l-3.37-2.45a1 1 0 00-1.176 0l-3.37 2.45c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.393c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.966z" />
    </svg>
  ));
};

const getBadge = (product: Product) => {
  if (product.stockQuantity !== undefined && product.stockQuantity <= 0) {
    return "Out of Stock";
  }

  if ((product.rating ?? 0) >= 4.6) {
    return "Popular";
  }

  return "New";
};

export const ProductCard = ({ product }: { product: Product }) => {
  const stockUnavailable = product.stockQuantity !== undefined && product.stockQuantity <= 0;
  const badge = getBadge(product);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative overflow-hidden aspect-4/3 bg-slate-100">
        <img
          src={`http://localhost:8080${product.imageUrl}`}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
        <span
          className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${
            stockUnavailable
              ? "bg-rose-500/95 text-white"
              : badge === "Popular"
              ? "bg-cyan-500/95 text-slate-950"
              : "bg-indigo-600/95 text-white"
          }`}
        >
          {stockUnavailable ? "Out of Stock" : badge}
        </span>
        <Link
          to={`/product/${product.id}`}
          className="absolute inset-x-0 bottom-4 mx-auto inline-flex w-fit items-center rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-950 backdrop-blur-sm opacity-0 transition duration-300 group-hover:opacity-100"
        >
          View details
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-600">
            {product.categoryName ?? "Category"}
          </span>
          <span className={`text-xs font-semibold uppercase ${stockUnavailable ? "text-rose-500" : "text-emerald-600"}`}>
            {stockUnavailable ? "Unavailable" : "In stock"}
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
          <p className="text-sm leading-6 text-slate-600 line-clamp-2">
            {product.description ?? "High-performance product designed to meet industrial demands."}
          </p>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
          <div className="flex items-center gap-1">{renderStars(product.rating ?? 4)}</div>
          <span className="text-sm">({(product.rating ?? 4).toFixed(1)})</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4">
          <p className="text-xl font-semibold text-slate-900">LKR {(product.price ?? 0).toFixed(2)}</p>
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${
              stockUnavailable
                ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                : "bg-cyan-600 text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-500"
            }`}
            disabled={stockUnavailable}
          >
            {stockUnavailable ? "Unavailable" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
};