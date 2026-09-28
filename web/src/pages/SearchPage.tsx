import React from 'react'
import { useProducts } from '../lib/useProducts'
import ProductCard from '../components/ProductCard'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function SearchPage(){
  const {products} = useProducts({limit:200})
  const [params,setParams] = useSearchParams()
  const q = params.get('q') || ''
  const category = params.get('cat') || ''
  const sort = params.get('sort') || ''
  const navigate = useNavigate()

  const filtered = products.filter(p=>{
    if(category && category !== 'الكل' && p.category !== category) return false
    if(q && !(`${p.title} ${p.category} ${p.description || ''}`.toLowerCase().includes(q.toLowerCase()))) return false
    return true
  })

  const sorted = [...filtered]
  if(sort === 'price_asc') sorted.sort((a,b)=>a.price-b.price)
  if(sort === 'price_desc') sorted.sort((a,b)=>b.price-a.price)

  return (
    <div className="container">
      <div className="mt-6 flex gap-3 items-center">
        <input defaultValue={q} onChange={e=> setParams(p=>{ p.set('q', e.target.value); return p })} placeholder="ابحث عن منتج" className="flex-1 p-3 rounded-md bg-white/6" />
        <select defaultValue={category} onChange={e=> setParams(p=>{ p.set('cat', e.target.value); return p })} className="p-3 rounded-md bg-white/6">
          <option>الكل</option>
          <option>Xbox</option>
          <option>Steam</option>
          <option>ألعاب الموبايل</option>
          <option>بطاقات رقمية</option>
          <option>PlayStation</option>
        </select>
        <select defaultValue={sort} onChange={e=> setParams(p=>{ p.set('sort', e.target.value); return p })} className="p-3 rounded-md bg-white/6">
          <option value="">الافتراضي</option>
          <option value="price_asc">الأرخص</option>
          <option value="price_desc">الأغلى</option>
        </select>
      </div>

      <div className="mt-6">
        {sorted.length===0 ? (
          <div className="card p-6 text-gray-400">لا يوجد نتائج</div>
        ) : (
          <div className="grid gap-4">
            {sorted.map(p=> <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
