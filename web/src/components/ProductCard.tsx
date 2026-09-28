import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../types'
import { formatPrice } from '../utils/format'
import { useWishlist } from '../state/wishlist'

export default function ProductCard({product}:{product:Product}){
  const {isSaved,toggle}=useWishlist()
  const saved = isSaved(product.id)

  return (
    <div className="card p-3 flex flex-col">
      <div className="flex gap-3">
        <div className="w-44 flex-shrink-0 product-image">
          <img src={product.image} alt={product.title} className="max-w-full max-h-36 object-contain" loading="lazy"/>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="text-xs text-gray-400">{product.category}</div>
            <Link to={`/product/${product.id}`} className="block text-lg font-semibold mt-1">{product.title}</Link>
            <div className="text-sm text-gray-400 mt-1">{product.rating ? `${product.rating} ★` : '—'}</div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div>
              {product.discount ? (
                <div className="flex items-baseline gap-2">
                  <div className="text-xl font-bold">{formatPrice(product.price)}</div>
                  <div className="text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</div>
                </div>
              ) : (
                <div className="text-xl font-bold">{formatPrice(product.price)}</div>
              )}
              {product.available ? <div className="text-sm text-gray-400">متوفر</div> : <div className="text-sm text-yellow-300">لسه موفرناش الخدمة دي 😅</div>}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={()=>toggle(product)} aria-label="wishlist" className={`p-2 rounded-md ${saved? 'bg-icy text-black': 'bg-white/6'}`}>❤</button>
              <button disabled={!product.available} className="px-3 py-2 rounded-md bg-icy text-black font-semibold">أضف إلى السلة</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
