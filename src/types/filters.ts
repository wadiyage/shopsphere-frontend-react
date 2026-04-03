export type SortOption = "newest" | "price-asc" | "price-desc";

export interface FilterState {
  search: string;
  category: string;
  sort: SortOption;
}