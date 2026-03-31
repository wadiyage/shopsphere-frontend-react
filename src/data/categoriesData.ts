import type { Category } from "../types/models/Category";


import category1 from "../assets/images/categories/c-d-x-PvIz8BmuwDw-unsplash.jpg"
import category2 from "../assets/images/categories/tory-hoffman-6lnpgd-ATvA-unsplash.jpg"
import category3 from "../assets/images/categories/chris-ralston-KulXAbGm5vI-unsplash.jpg"
import category4 from "../assets/images/categories/matt-c-9nVF3PK0cqY-unsplash.jpg"
import category5 from "../assets/images/categories/henry-perks-fOl7OmnYY9Y-unsplash.jpg"
import category6 from "../assets/images/categories/sticker-mule-rxv8P843Bco-unsplash.jpg"

export const categories: Category[] = [
    {
    id: 1,
    name: "Electronics",
    img: category1,
    path: "/products?category=electronics",
    description: "Industrial-grade electronics and devices",
  },
  {
    id: 2,
    name: "Tools",
    img: category2,
    path: "/products?category=tools",
    description: "Heavy-duty tools for manufacturing & construction",
  },
  {
    id: 3,
    name: "Machinery",
    img: category3,
    path: "/products?category=machinery",
    description: "Industrial machines for large-scale operations",
  },
  {
    id: 4,
    name: "Safety Equipment",
    img: category4,
    path: "/products?category=safety",
    description: "Protective gear and safety devices",
  },
  {
    id: 5,
    name: "Lighting",
    img: category5,
    path: "/products?category=lighting",
    description: "Industrial and warehouse lighting solutions",
  },
  {
    id: 6,
    name: "Packaging",
    img: category6,
    path: "/products?category=packaging",
    description: "Materials for shipping, storing, and handling",
  }
]