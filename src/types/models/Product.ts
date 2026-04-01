export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stockQuantity?: number;
  imageUrl: string;
  categoryName?: string;
  rating?: number;
}