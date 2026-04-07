import { useState } from "react";

const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imageSrc, setImageSrc] = useState(src)

  return (
    <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-slate-100">
      <img
        src={imageSrc}
        alt={alt}
        className="h-full w-full object-cover"
        onError={() =>
          setImageSrc(
            "https://images.unsplash.com/photo-1506755855726-21b76d1488bd?w=400&h=400&fit=crop"
          )
        }
      />
    </div>
  )
}

export default ProductImage