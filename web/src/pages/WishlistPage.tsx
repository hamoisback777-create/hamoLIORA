import React from 'react'
import { useProducts } from '../lib/useProducts'
import ProductListItem from '../components/ProductListItem'

export default function WishlistPage(){
  const {products} = useProducts({limit:50})
  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mt-6">قائمة المفضلة</h2>
      <p className="text-gray-400">المنتجات التي حفظتها للمراجعة لاحقًا.</p>
      <div className="mt-4 grid gap-3">
        {products.map(p=> <ProductListItem key={p.id} product={p} />)}
      </div>
    </div>
  )
}
