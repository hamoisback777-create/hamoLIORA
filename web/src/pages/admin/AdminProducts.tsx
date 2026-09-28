import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../lib/firebase'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

export default function AdminProducts(){
  const {db} = useFirebase()
  const [products,setProducts] = useState<any[]>([])

  useEffect(()=>{
    if(!db) return
    async function load(){
      const snap = await getDocs(collection(db,'products'))
      const arr:any[] = []
      snap.forEach(d=> arr.push({id:d.id,...d.data()}))
      setProducts(arr)
    }
    load()
  },[db])

  async function remove(id:string){
    if(!db) return
    await deleteDoc(doc(db,'products',id))
    setProducts(prev=>prev.filter(p=>p.id!==id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">المنتجات</h3>
        <Link to="/admin/products/new" className="px-3 py-2 bg-icy text-black rounded-md">أضف منتج</Link>
      </div>
      <div className="space-y-3">
        {products.map(p=> (
          <div key={p.id} className="card p-3 flex items-center justify-between">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-400">{p.category}</div>
            </div>
            <div className="flex gap-2">
              <Link to={`/admin/products/edit/${p.id}`} className="px-3 py-1 border rounded-md">تعديل</Link>
              <button onClick={()=>remove(p.id)} className="px-3 py-1 bg-red-500 text-white rounded-md">حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
