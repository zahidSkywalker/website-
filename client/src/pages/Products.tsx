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
      <div className="flex items-center gap-3">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products" className="w-full rounded-md border px-3 py-2" />
      </div>
      {loading && <div>Loading…</div>}
      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.items.map((p) => (
            <Link key={p._id} to={`/products/${p.slug}`} className="group rounded-xl border overflow-hidden">
              <div className="aspect-square bg-gray-50" />
              <div className="p-3">
                <div className="line-clamp-1 font-medium">{p.title}</div>
                <div className="text-brand font-semibold">{formatBDT(p.price.amount)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

