import { Link } from "react-router-dom";
import type { Product } from "../../types/models/Product";
import { useCart } from "../../context/CartContext";
import React from "react";
import { toast } from "react-toastify";

const getBadge = (product: Product) => {
  if (product.stockQuantity !== undefined && product.stockQuantity <= 0) {
    return "Out of Stock";
  }

  if ((product.rating ?? 0) >= 4.6) {
    return "Popular";
  }

  return undefined;
};

export const ProductCard = React.memo(({ product }: { product: Product }) => {
  const { addToCart } = useCart()
  const stockUnavailable = product.stockQuantity !== undefined && product.stockQuantity <= 0
  const badge = getBadge(product)

  return (
    <article className="group overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${product.id}`} aria-label={`View ${product.name} details`}>
        <div className="relative overflow-hidden aspect-5/4 bg-slate-100">
          <img
            src={`http://localhost:8080${product.imageUrl}`}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 to-transparent" />
          {badge ? (
            <span className="absolute top-4 left-4 rounded-full bg-slate-950/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-100">
              {badge}
            </span>
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-[0.25em] text-slate-500">
            {product.categoryName ?? "Category"}
          </span>
          <span className={`text-xs font-semibold uppercase tracking-[0.25em] ${stockUnavailable ? "text-rose-500" : "text-slate-500"}`}>
            {stockUnavailable ? "Unavailable" : "In stock"}
          </span>
        </div>

        <div className="space-y-3">
          <Link to={`/product/${product.id}`} aria-label={`View ${product.name} details`}>
            <h3 className="text-xl font-semibold tracking-tight text-slate-950 line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm leading-6 text-slate-500 line-clamp-2">
            {product.description ?? "A refined design built for performance and clarity."}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4">
          <p className="text-2xl font-semibold text-slate-950">LKR {(product.price ?? 0).toFixed(2)}</p>
          <button
            type="button"
            disabled={stockUnavailable}
            aria-label={stockUnavailable ? `${product.name} is unavailable` : `Add ${product.name} to cart`}
            className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition duration-200 ${stockUnavailable
              ? "border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-linear-to-r from-slate-950 via-slate-800 to-slate-950 text-white shadow-lg shadow-slate-950/10 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
              }`}
            onClick={async (e) => {
              e.preventDefault()

              if (!stockUnavailable) {
                try {
                  addToCart(product.id, 1)

                  toast.success(`${product.name} added to cart!`, {
                    position: "top-right",
                    autoClose: 3000,
                  });
                } catch (error) {
                  toast.error("Failed to add product to cart.");
                }
              }
            }}
          >
            {
              product.stockQuantity && product.stockQuantity > 0
                ? "Add to cart"
                : "Unavailable"
            }
          </button>
        </div>
      </div>
    </article>
  );
})