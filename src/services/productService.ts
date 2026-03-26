import API from "./api";

export const getProducts = () => API.get("/products")
export const getProductById = (id: string) => API.get(`/products/${id}`)