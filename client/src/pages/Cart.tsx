import { useAppDispatch, useAppSelector } from '../store'
import { removeItem, updateQty, clear } from '../store/cartSlice'
import { formatBDT } from '../lib/currency'

export default function Cart() {
  const { items } = useAppSelector(s => s.cart)
  const dispatch = useAppDispatch()
  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Your cart</h1>
      {items.length === 0 && <div className="text-gray-500">Cart is empty</div>}
      {items.length > 0 && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map(it => (
              <div key={it.productId} className="flex items-center justify-between border rounded-lg p-4">
                <div className="flex-1">
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm text-gray-500">{formatBDT(it.unitPrice)}</div>
                </div>
                <input
                  type="number"
                  className="w-20 rounded-md border px-2 py-1"
                  value={it.quantity}
                  min={1}
                  onChange={e => dispatch(updateQty({ productId: it.productId, quantity: Number(e.target.value) }))}
                />
                <button onClick={() => dispatch(removeItem(it.productId))} className="ml-4 text-red-600 hover:underline">Remove</button>
              </div>
            ))}
          </div>
          <div className="border rounded-lg p-4 space-y-3 h-fit">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatBDT(subtotal)}</span></div>
            <a href="/checkout" className="block text-center rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark">Checkout</a>
            <button onClick={() => dispatch(clear())} className="w-full text-sm text-gray-600 hover:underline">Clear cart</button>
          </div>
        </div>
      )}
    </div>
  )
}

