import React, { useEffect, useState } from 'react'
import { useFirebase } from '../lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export default function OrdersPage(){
  const {db,user} = useFirebase()
  const [orders,setOrders] = useState<any[]>([])

  useEffect(()=>{
    if(!db || !user) return
    async function load(){
      const q = query(collection(db,'orders'), where('userId','==', user.uid))
      const snap = await getDocs(q)
      const arr:any[] = []
      snap.forEach(d=> arr.push({id:d.id, ...d.data()}))
      setOrders(arr)
    }
    load()
  },[db,user])

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mt-6">طلباتي</h2>
      <p className="text-gray-400">سجل الطلبات وحالة كل طلب.</p>
      <div className="mt-4 space-y-3">
        {orders.length===0 && <div className="card p-4 text-gray-400">لا توجد طلبات بعد.</div>}
        {orders.map(o=> (
          <div key={o.id} className="card p-4 flex justify-between items-center">
            <div>
              <div className="font-semibold">طلب #{o.id}</div>
              <div className="text-sm text-gray-400">الحالة: {o.status}</div>
            </div>
            <div className="text-right">
              <div className="font-bold">{o.total} $</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
