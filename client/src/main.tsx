import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import './i18n'
import './index.css'
import App from './App.tsx'
import AppMeta from './AppMeta'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'

export function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Premium Apparel & Shoes</h1>
      <p className="text-gray-600">Discover curated collections for Bangladesh. Fast delivery nationwide.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border p-6">New Arrivals</div>
        <div className="rounded-xl border p-6">Best Sellers</div>
        <div className="rounded-xl border p-6">Budget Friendly</div>
      </div>
    </div>
  )
}

export function Placeholder({ title }: { title: string }) {
  return <div className="text-gray-500">{title} coming soon…</div>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppMeta>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}> 
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:slug" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="account" element={<Placeholder title="Account" />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppMeta>
    </Provider>
  </StrictMode>
)
