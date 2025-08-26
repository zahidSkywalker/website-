import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../lib/api'
import type { Product } from '../types'
import { useAppDispatch } from '../store'
import { addItem } from '../store/cartSlice'
import { formatBDT } from '../lib/currency'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!slug) return
    api.get<Product>(`/products/${slug}`).then(r => setProduct(r.data))
  }, [slug])

  if (!product) return <div className="rounded-xl border p-8 text-center text-gray-600">Loading…</div>

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="rounded-xl border aspect-square bg-gray-50" />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{product.title}</h1>
          <div className="mt-2 text-2xl text-brand font-bold">{formatBDT(product.price.amount)}</div>
        </div>
        {product.description && (
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => dispatch(addItem({ productId: product._id, title: product.title, unitPrice: product.price.amount, quantity: 1 }))}
            className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark"
          >
            Add to cart
          </button>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 hover:bg-gray-50">Buy now</button>
        </div>
      </div>
    </div>
  )
}

