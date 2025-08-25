import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ReactNode } from 'react'

export default function AppMeta({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>BD Shop - Apparel & Shoes</title>
        <meta name="description" content="Premium apparel & shoe store for Bangladesh. Nationwide delivery." />
      </Helmet>
      {children}
    </HelmetProvider>
  )
}

