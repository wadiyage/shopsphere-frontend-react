import placeholderImage from '../../assets/images/products/placeholder-product.png'
const ProductImage = ({ imageUrl, name }: { imageUrl?: string, name?: string }) => {
    return (
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
            <img
                src={imageUrl ? `http://localhost:8080${imageUrl}` : placeholderImage}
                alt={name}
                className="h-full w-full object-cover"
                onError={(event) => {
                    const target = event.currentTarget as HTMLImageElement
                    target.src = placeholderImage
                }}
            />
        </section>
    )
}

export default ProductImage