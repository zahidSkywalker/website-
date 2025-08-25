export type CurrencyCode = 'BDT'

export interface Price {
  amount: number
  currency: CurrencyCode
}

export interface Category {
  _id: string
  name: string
  slug: string
  description?: string
}

export interface Product {
  _id: string
  title: string
  slug: string
  description?: string
  categoryId: string
  brand?: string
  images: string[]
  sizes: string[]
  colors: string[]
  price: Price
  compareAtPrice?: Price
  stock: number
  isActive: boolean
}

export interface Paginated<T> {
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface CartItem {
  productId: string
  title: string
  image?: string
  unitPrice: number
  quantity: number
}

