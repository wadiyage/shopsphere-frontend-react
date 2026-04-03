import type { Product } from "../types/models/Product";
import type { FilterState, SortOption } from "../types/filters";

const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  wait: number
): ((...args: T) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: T) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait)
  }
}

const extractCategories = (products: Product[]): string[] => {
  const categories = new Set<string>()
  products.forEach((product) => {
    if (product.categoryName) {
      categories.add(product.categoryName)
    }
  });
  return Array.from(categories).sort()
}

const filterProducts = (
  products: Product[],
  filters: FilterState
): Product[] => {
  return products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(filters.search.toLowerCase())

    const matchesCategory =
      filters.category === "all" || product.categoryName === filters.category

    return matchesSearch && matchesCategory
  })
}

const sortProducts = (products: Product[], sortOption: SortOption): Product[] => {
  const sorted = [...products]

  switch (sortOption) {
    case "price-asc":
      return sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
    case "price-desc":
      return sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    case "newest":
    default:
      return sorted
  }
}

export { debounce, extractCategories, filterProducts, sortProducts }