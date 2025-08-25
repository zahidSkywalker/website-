import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAppDispatch, useAppSelector } from '../store'
import { api } from '../lib/api'
import { clear } from '../store/cartSlice'
import { useState } from 'react'
import { formatBDT } from '../lib/currency'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  addressLine1: z.string().min(4),
  addressLine2: z.string().optional(),
  city: z.string().min(2),
  area: z.string().optional(),
  postalCode: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export default function Checkout() {
  const { items } = useAppSelector(s => s.cart)
  const dispatch = useAppDispatch()
  const [orderId, setOrderId] = useState<string | null>(null)
  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0)
  const shippingFee = subtotal > 3000 ? 0 : 100
  const total = subtotal + shippingFee
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    const res = await api.post('/orders', {
      items,
      shippingAddress: values,
      shippingFee,
    })
    setOrderId(res.data._id)
    dispatch(clear())
  }

  if (orderId) return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Order placed</h1>
      <div className="text-gray-600">Order ID: {orderId}</div>
      <a href="/" className="text-brand hover:underline">Continue shopping</a>
    </div>
  )

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <input placeholder="Full name" {...register('name')} className="w-full rounded-md border px-3 py-2" />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        <input placeholder="Phone" {...register('phone')} className="w-full rounded-md border px-3 py-2" />
        <input placeholder="Address line 1" {...register('addressLine1')} className="w-full rounded-md border px-3 py-2" />
        <input placeholder="Address line 2 (optional)" {...register('addressLine2')} className="w-full rounded-md border px-3 py-2" />
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="City" {...register('city')} className="w-full rounded-md border px-3 py-2" />
          <input placeholder="Area" {...register('area')} className="w-full rounded-md border px-3 py-2" />
        </div>
        <input placeholder="Postal code" {...register('postalCode')} className="w-full rounded-md border px-3 py-2" />
        <button disabled={isSubmitting} className="rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark disabled:opacity-50">Place order</button>
      </form>

      <div className="border rounded-lg p-4 space-y-2 h-fit">
        <div className="flex justify-between"><span>Subtotal</span><span>{formatBDT(subtotal)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>{shippingFee === 0 ? 'Free' : formatBDT(shippingFee)}</span></div>
        <div className="flex justify-between font-semibold"><span>Total</span><span>{formatBDT(total)}</span></div>
      </div>
    </div>
  )
}

