import { Link, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function App() {
  const { t, i18n } = useTranslation()
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="container-safe flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-brand/10 text-brand font-bold">B</span>
            <span className="font-semibold text-lg tracking-tight">BD Shop</span>
          </Link>
          <div className="hidden md:block flex-1 max-w-lg">
            <div className="relative">
              <input
                placeholder={t('nav.search') as string || 'Search products'}
                className="w-full rounded-lg border bg-white px-4 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.237 12.068l3.722 3.723a.75.75 0 1 0 1.06-1.06l-3.723-3.723A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd"/></svg>
              </div>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/products" className="hover:text-brand transition-colors">{t('nav.products')}</Link>
            <Link to="/cart" className="relative hover:text-brand transition-colors">
              {t('nav.cart')}
              <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">0</span>
            </Link>
            <Link to="/account" className="hover:text-brand transition-colors">{t('nav.account')}</Link>
            <div className="hidden sm:flex items-center gap-2 ml-2">
              <button onClick={() => i18n.changeLanguage('bn')} className="px-2 py-1 rounded border text-xs hover:bg-gray-50">বাংলা</button>
              <button onClick={() => i18n.changeLanguage('en')} className="px-2 py-1 rounded border text-xs hover:bg-gray-50">EN</button>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container-safe py-8">
          <Outlet />
        </div>
      </main>
      <footer className="border-t bg-gray-50/60">
        <div className="container-safe grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <div className="space-y-2">
            <div className="font-semibold">About</div>
            <p className="text-gray-600">Premium apparel & shoes curated for Bangladesh. Fast nationwide delivery.</p>
          </div>
          <div>
            <div className="font-semibold">Support</div>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li><Link to="/" className="hover:text-brand">Help Center</Link></li>
              <li><Link to="/" className="hover:text-brand">Shipping & Returns</Link></li>
              <li><Link to="/" className="hover:text-brand">Order Status</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Company</div>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li><Link to="/" className="hover:text-brand">About Us</Link></li>
              <li><Link to="/" className="hover:text-brand">Careers</Link></li>
              <li><Link to="/" className="hover:text-brand">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Newsletter</div>
            <div className="mt-2 flex gap-2">
              <input placeholder="Your email" className="w-full rounded-md border px-3 py-2" />
              <button className="rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark">Join</button>
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="container-safe py-6 text-xs text-gray-500">
            © {new Date().getFullYear()} BD Shop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
