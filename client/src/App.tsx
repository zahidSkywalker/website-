import { Link, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function App() {
  const { t, i18n } = useTranslation()
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container-safe flex h-16 items-center justify-between">
          <Link to="/" className="font-semibold text-lg">
            {t('brand')}
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/products" className="hover:text-brand">{t('nav.products')}</Link>
            <Link to="/cart" className="hover:text-brand">{t('nav.cart')}</Link>
            <Link to="/account" className="hover:text-brand">{t('nav.account')}</Link>
            <div className="flex items-center gap-2 ml-2">
              <button onClick={() => i18n.changeLanguage('bn')} className="px-2 py-1 rounded border text-xs">বাংলা</button>
              <button onClick={() => i18n.changeLanguage('en')} className="px-2 py-1 rounded border text-xs">EN</button>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container-safe py-8">
          <Outlet />
        </div>
      </main>
      <footer className="border-t">
        <div className="container-safe py-6 text-xs text-gray-500">
          © {new Date().getFullYear()} BD Shop. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
