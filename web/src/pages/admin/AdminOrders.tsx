import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default function AdminOrders(){
  const {db} = useFirebase()
  const [orders,setOrders] = useState<any[]>([])

  useEffect(()=>{
    if(!db) return
    async function load(){
      const snap = await getDocs(collection(db,'orders'))
      const arr:any[] = []
      snap.forEach(d=> arr.push({id:d.id,...d.data()}))
      setOrders(arr)
    }
    load()
  },[db])

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">الطلبات</h3>
      <div className="space-y-3">
        {orders.map(o=> (
          <div key={o.id} className="card p-3 flex items-center justify-between">
            <div>
              <div className="font-semibold">طلب #{o.id}</div>
              <div className="text-sm text-gray-400">{o.userEmail}</div>
            </div>
            <div className="text-right">
              <div className="font-bold">{o.total} $</div>
              <div className="text-sm text-gray-400">{o.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
