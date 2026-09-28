import React from 'react'
import { Product } from '../types'
import { formatPrice } from '../utils/format'
import { useWishlist } from '../state/wishlist'
import { useCart } from '../state/cart'

export default function ProductListItem({product}:{product:Product}){
  const {isSaved,toggle} = useWishlist()
  const {add} = useCart()
  const saved = isSaved(product.id)
  return (
    <div className="card p-3 flex items-center gap-4">
      <div className="w-36 product-image">
        <img src={product.image} alt={product.title} className="object-contain max-h-28" loading="lazy"/>
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-400">{product.category}</div>
        <div className="font-semibold text-lg">{product.title}</div>
        <div className="text-sm text-gray-400">{product.rating ? `${product.rating} ★` : '—'}</div>
      </div>
      <div className="text-right">
        <div className="text-xl font-bold">{formatPrice(product.price)}</div>
        <div className="flex gap-2 mt-2">
          <button onClick={()=>toggle(product)} className={`px-3 py-1 rounded-md ${saved? 'bg-icy text-black':'bg-white/6'}`}>❤</button>
          <button onClick={()=>add(product)} disabled={!product.available} className="px-3 py-1 rounded-md bg-icy text-black">أضف إلى السلة</button>
        </div>
      </div>
    </div>
  )
}
