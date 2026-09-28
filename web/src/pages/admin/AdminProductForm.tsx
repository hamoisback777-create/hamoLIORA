import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../lib/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function AdminProductForm({edit}:{edit?:boolean}){
  const {db} = useFirebase()
  const [form,setForm] = useState({title:'',category:'',image:'',price:0,oldPrice:0,discount:0,available:true,description:''})
  const navigate = useNavigate()

  async function create(){
    if(!db) return
    await addDoc(collection(db,'products'),{...form,price:Number(form.price),oldPrice:Number(form.oldPrice),discount:Number(form.discount),available:Boolean(form.available)})
    navigate('/admin/products')
  }

  return (
    <div className="card p-4">
      <h3 className="text-xl font-semibold">{edit ? 'تعديل منتج' : 'إضافة منتج'}</h3>
      <div className="mt-3 grid gap-2">
        <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="العنوان" className="p-2 rounded bg-white/6" />
        <input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="الفئة" className="p-2 rounded bg-white/6" />
        <input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} placeholder="رابط الصورة" className="p-2 rounded bg-white/6" />
        <input type="number" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})} placeholder="السعر" className="p-2 rounded bg-white/6" />
        <input type="number" value={form.oldPrice} onChange={e=>setForm({...form,oldPrice:Number(e.target.value)})} placeholder="السعر القديم" className="p-2 rounded bg-white/6" />
        <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="الوصف" className="p-2 rounded bg-white/6" />
        <div className="flex gap-2">
          <button onClick={create} className="px-3 py-2 bg-icy text-black rounded-md">حفظ</button>
          <button onClick={()=>navigate('/admin/products')} className="px-3 py-2 border rounded-md">إلغاء</button>
        </div>
      </div>
    </div>
  )
}
