import React from 'react'
import { useCart } from '../state/cart'
import { formatPrice } from '../utils/format'

export default function CartPage(){
  const {items,updateQty,remove,subtotal} = useCart()
  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mt-6">سلة التسوق</h2>
      <div className="mt-4 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          {items.length===0 && <div className="card p-4 text-gray-400">السلة فارغة</div>}
          {items.map(i=> (
            <div key={i.id} className="card p-3 flex items-center gap-3">
              <div className="w-28 product-image"><img src={i.image} alt={i.title} className="object-contain max-h-20" loading="lazy"/></div>
              <div className="flex-1">
                <div className="font-semibold">{i.title}</div>
                <div className="text-sm text-gray-400">{i.category}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{formatPrice(i.price)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={()=> updateQty(i.id, i.quantity -1)} className="px-3 py-1 border rounded">-</button>
                  <div className="px-3 py-1">{i.quantity}</div>
                  <button onClick={()=> updateQty(i.id, i.quantity +1)} className="px-3 py-1 border rounded">+</button>
                  <button onClick={()=> remove(i.id)} className="px-3 py-1 text-red-400">إزالة</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="card p-4">
          <div className="font-semibold">ملخص الطلب</div>
          <div className="mt-4 flex justify-between"><div>المجموع الفرعي</div><div>{formatPrice(subtotal)}</div></div>
          <div className="mt-4">
            <input placeholder="كود الخصم" className="w-full p-2 rounded bg-white/6" />
            <button className="mt-3 w-full px-4 py-2 bg-icy text-black rounded-md">انتقل للدفع</button>
          </div>
        </aside>
      </div>
    </div>
  )
}
