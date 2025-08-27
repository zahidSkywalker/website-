import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CartItem } from '../types'

export interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
}

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(i => i.productId === action.payload.productId)
      if (existing) existing.quantity += action.payload.quantity
      else state.items.push(action.payload)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.productId !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    updateQty(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const it = state.items.find(i => i.productId === action.payload.productId)
      if (it) it.quantity = Math.max(1, action.payload.quantity)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    clear(state) {
      state.items = []
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
  },
})

export const { addItem, removeItem, updateQty, clear } = slice.actions
export default slice.reducer

