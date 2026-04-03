import type { Product } from "../../types/models/Product"
import { ProductCard } from "../home/ProductCard"

const ProductListingGrid = ({ products }: { products: Product[] }) => {
    return (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="animate-fadeIn transition-all duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </section>
    )
}

export default ProductListingGrid