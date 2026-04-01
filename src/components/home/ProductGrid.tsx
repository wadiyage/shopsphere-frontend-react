import { ProductCard } from "./ProductCard"

const ProductGrid = ({ products }: { products: any[] }) => {
    return (
        <section>
            <div className="flex flex-col items-center mb-6">
                <div className="w-full mx-auto my-5 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start justify-between gap-4">
                    <div className="flex flex-col items-start">
                        <h2 className="text-2xl md:text-3xl font-bold uppercase text-gray-900">Featured Products</h2>
                        <p className="text-xl font-light text-gray-600">Check out our latest and greatest products!</p>
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                        <span className="text-sm text-gray-500">Showing </span>
                        <span className="text-sm font-medium text-gray-900">{products.length}</span>
                        <span className="text-sm text-gray-500"> products</span>
                    </div>
                    <div>
                        <select className="mt-3 md:mt-0 border rounded-lg px-3 py-2 text-sm">
                            <option>Sort by</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Top Rated</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-auto px-4 sm:px-6 lg:px-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

        </section>
    )
}

export default ProductGrid