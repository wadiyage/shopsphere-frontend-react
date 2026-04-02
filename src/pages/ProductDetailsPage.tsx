import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../services/productService'
import type { Product } from '../types/models/Product'
import ProductImage from '../components/product-details/ProductImage'
import ProductInfo from '../components/product-details/ProductInfo'
import LoadingState from '../components/common/LoadingState'
import ErrorState from '../components/common/ErrorState'
import EmptyState from '../components/common/EmptyState'


const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Product not found.')
      setLoading(false)
      return
    }

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await getProductById(id)
        setProduct(res.data)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Unable to load product details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])



  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-200/50 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Product details</h1>
            <p className="mt-1 text-sm text-slate-500">Explore the product and add it to your cart.</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            Back to Products
          </Link>
        </div>

        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {!loading && !error && !product && <EmptyState />}

        {!loading && !error && product && (
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <ProductImage imageUrl={product.imageUrl} name={product.name} />
            <ProductInfo product={product} />
          </div>
        )}
      </section>
    </main>
  )
}

export default ProductDetailsPage