import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import type { Paginated, Product } from '../types'
import { Link } from 'react-router-dom'
import { formatBDT } from '../lib/currency'

export default function Products() {
  const [data, setData] = useState<Paginated<Product> | null>(null)
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')

  useEffect(() => {
    setLoading(true)
    api
      .get<Paginated<Product>>('/products', { params: { q } })
      .then(r => setData(r.data))
      .finally(() => setLoading(false))
  }, [q])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Products</h2>
        <div className="flex-1" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products"
          className="w-full sm:w-80 rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand/30" />
      </div>

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl border overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-100" />
              <div className="p-3 space-y-2">
                <div className="h-4 w-3/4 bg-gray-100 rounded" />
                <div className="h-4 w-1/3 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && data && data.items.length === 0 && (
        <div className="rounded-xl border p-8 text-center text-gray-600">No products found.</div>
      )}

      {!loading && data && data.items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.items.map((p) => (
            <Link key={p._id} to={`/products/${p.slug}`} className="group rounded-xl border overflow-hidden bg-white transition-shadow hover:shadow-lg">
              <div className="aspect-square bg-gray-50" />
              <div className="p-3">
                <div className="line-clamp-1 font-medium group-hover:text-brand transition-colors">{p.title}</div>
                <div className="text-brand font-semibold">{formatBDT(p.price.amount)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

