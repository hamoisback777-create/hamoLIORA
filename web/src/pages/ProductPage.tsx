import React from 'react'
import { useParams } from 'react-router-dom'
import { useProduct } from '../lib/useProducts'

export default function ProductPage(){
  const {id} = useParams()
  const {product} = useProduct(id || '')
  if(!product) return <div className="container">جارٍ التحميل...</div>
  return (
    <div className="container">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-4">
          <div className="product-image">
            <img src={product.image} alt={product.title} className="object-contain max-h-96"/>
          </div>
        </div>
        <div className="card p-6">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="text-sm text-gray-400 my-2">{product.category}</div>
          <div className="text-xl font-bold mt-4">{product.price}$</div>
          <div className="mt-4">{product.description}</div>
          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 bg-icy text-black rounded-md">أضف إلى السلة</button>
            <button className="px-4 py-2 border rounded-md">♡ حفظ</button>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h3 className="text-xl font-semibold">منتجات مشابهة</h3>
        <div className="mt-4 grid gap-4">
          {/* TODO: similar products */}
        </div>
      </section>
    </div>
  )
}
