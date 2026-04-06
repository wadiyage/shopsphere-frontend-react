import React, { useCallback } from "react";
import { debounce } from "../../utils/productUtlis";
import type { FilterState, SortOption } from "../../types/ui/filters";

interface Props {
    filters: FilterState
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>
    categories: string[]
    setSearchParams: any
}

const ProductFilters: React.FC<Props> = ({
    filters,
    setFilters,
    categories,
    setSearchParams
}) => {
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setFilters((prev) => ({ ...prev, search: value }));

            setSearchParams((params: any) => {
                params.set("search", value);
                return params;
            })
        }, 300),
        [setFilters, setSearchParams]
    )

    const handleSearchChange = (value: string) => {
        debouncedSearch(value);
    }

    const handleCategoryChange = (category: string) => {
        setFilters((prev) => ({ ...prev, category }))

        setSearchParams((params: any) => {
            params.set("category", category)
            return params
        })
    }

    const handleSortChange = (sort: SortOption) => {
        setFilters((prev) => ({ ...prev, sort }))

        setSearchParams((params: any) => {
            params.set("sort", sort);
            return params
        })
    }

    const handleResetFilters = () => {
        setFilters({ search: "", category: "all", sort: "newest" })
        setSearchParams({})
    }

    return (
        <div className="mb-12 space-y-6">
            <div>
                <label htmlFor="search" className="block text-sm font-semibold text-slate-700 mb-3">
                    Search Products
                </label>
                <div className="relative">
                    <input
                        id="search"
                        type="text"
                        placeholder="Search by product name..."
                        defaultValue={filters.search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full px-4 py-3 pl-10 rounded-full border border-slate-300 bg-white text-slate-900 placeholder-slate-500 transition focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950/10"
                    />
                    <svg
                        className="absolute left-3 top-3.5 h-5 w-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
                <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-3">
                        Category
                    </label>
                    <select
                        id="category"
                        value={filters.category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-full border border-slate-300 bg-white text-slate-900 transition focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950/10 appearance-none cursor-pointer pr-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundPosition: "right 0.75rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.5em 1.5em",
                            paddingRight: "2.5rem",
                        }}
                    >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="sort" className="block text-sm font-semibold text-slate-700 mb-3">
                        Sort By
                    </label>
                    <select
                        id="sort"
                        value={filters.sort}
                        onChange={(e) => handleSortChange(e.target.value as SortOption)}
                        className="w-full px-4 py-3 rounded-full border border-slate-300 bg-white text-slate-900 transition focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950/10 appearance-none cursor-pointer pr-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundPosition: "right 0.75rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.5em 1.5em",
                            paddingRight: "2.5rem",
                        }}
                    >
                        <option value="newest">Newest (Default)</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>

                {/* Reset Button */}
                <div className="flex items-end">
                    <button
                        onClick={handleResetFilters}
                        className="w-full px-4 py-3 rounded-full bg-slate-200 text-slate-900 font-semibold transition duration-200 hover:bg-slate-300 active:scale-95"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {(filters.search || filters.category !== "all" || filters.sort !== "newest") && (
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                    <span className="font-semibold">Active Filters:</span>
                    {filters.search && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-200 text-slate-800">
                            Search: "{filters.search}"
                        </span>
                    )}
                    {filters.category !== "all" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-200 text-slate-800">
                            Category: {filters.category}
                        </span>
                    )}
                    {filters.sort !== "newest" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-200 text-slate-800">
                            Sort: {filters.sort === "price-asc" ? "Low to High" : "High to Low"}
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProductFilters