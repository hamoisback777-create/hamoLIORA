import React from 'react'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../lib/useProducts'

export default function Home(){
  const {products} = useProducts({limit:12})
  return (
    <div className="container">
      <section className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 card p-6">
            <div className="h-64 bg-gradient-to-tr from-white/3 to-white/6 rounded-xl flex items-center justify-center">
              <h2 className="text-3xl font-bold">عروض وخصومات اليوم</h2>
            </div>
          </div>
          <div className="card p-4">
            <h3 className="text-xl font-semibold">الفئات</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {['الكل','Xbox','Steam','ألعاب الموبايل','بطاقات رقمية','PlayStation'].map(c=> (
                <button key={c} className="px-3 py-2 bg-white/6 rounded-full text-sm">{c}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold">منتجات مميزة</h3>
            <p className="text-sm text-gray-400">أفضل العروض المميزة هذا الأسبوع</p>
          </div>
          <a className="text-sm text-gray-400">عرض الكل →</a>
        </div>
        <div className="mt-4 grid gap-4">
          {products.map(p=> (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold">الأكثر مبيعًا</h3>
            <p className="text-sm text-gray-400">المنتجات الأكثر شراءً</p>
          </div>
          <a className="text-sm text-gray-400">عرض الكل →</a>
        </div>
        <div className="mt-4 grid gap-4">
          {products.slice(0,6).map(p=> (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  )
}
