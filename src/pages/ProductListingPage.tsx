import React, { useEffect, useState, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import type { Product } from "../types/models/Product"
import { getProducts } from "../services/productService"
import LoadingState from "../components/common/LoadingState"
import ErrorState from "../components/common/ErrorState"
import EmptyState from "../components/common/EmptyState"
import ProductHeader from "../components/product-listings/ProductHeader"
import ProductListingGrid from "../components/product-listings/ProductListingGrid"
import { extractCategories, filterProducts, sortProducts } from "../utils/productUtlis"
import ProductFilters from "../components/product-listings/ProductFilters"
import type { FilterState, SortOption } from "../types/filters"

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchParams, setSearchParams] = useSearchParams()

  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "all",
    sort: (searchParams.get("sort") as SortOption) || "newest",
  })


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProducts()

        const data: Product[] = Array.isArray(res.data)
          ? res.data
          : []

        setProducts(
          data.map((p) => ({
            ...p,
            rating:
              p.rating ??
              Math.min(5, Math.max(3.5, Math.random() * 2 + 3.5)),
          }))
        );
      } catch {
        setError("Failed to load products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = useMemo(
    () => extractCategories(products),
    [products]
  )

  const filteredProducts = useMemo(() => {
        const filtered = filterProducts(products, filters);
        return sortProducts(filtered, filters.sort);
    }, [products, filters])

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <LoadingState message="Loading products..." />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <ErrorState message={error} />
        </div>
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <EmptyState message="No products available at the moment." />
        </div>
      </main>
    );
  }

  const hasNoResults = filteredProducts.length === 0;

  return (
    <main className="min-h-screen bg-slate-50">
      <ProductHeader />

      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <ProductFilters
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          setSearchParams={setSearchParams}
        />

        <div className="mb-6 text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{filteredProducts.length}</span> of{" "}
          <span className="font-semibold text-slate-900">{products.length}</span> products
        </div>

        {hasNoResults ? (
          <EmptyState message="No products match your filters. Try adjusting your search or filters." />
        ) : (
          <ProductListingGrid products={filteredProducts} />

        )}
      </section>
    </main>
  );
};

export default ProductListingPage;
