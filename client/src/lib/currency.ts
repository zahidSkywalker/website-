import currency from 'currency.js'

export function formatBDT(amount: number): string {
  return currency(amount, { symbol: '৳', precision: 0 }).format()
}

