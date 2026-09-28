import React, { useEffect, useState } from 'react'
import { useFirebase } from '../lib/firebase'
import { collection, addDoc, query, where, getDocs, doc, setDoc } from 'firebase/firestore'

export default function SupportPage(){
  const {db,user} = useFirebase()
  const [convos,setConvos] = useState<any[]>([])
  const [message,setMessage] = useState('')

  useEffect(()=>{
    if(!db || !user) return
    async function load(){
      const q = query(collection(db,'supportConversations'), where('userId','==',user.uid))
      const snap = await getDocs(q)
      const arr:any[] = []
      snap.forEach(d=> arr.push({id:d.id, ...d.data()}))
      setConvos(arr)
    }
    load()
  },[db,user])

  async function create(){
    if(!db || !user || !message) return
    const ref = await addDoc(collection(db,'supportConversations'),{userId:user.uid, createdAt:new Date().toISOString(), messages:[{from:'user',text:message,at:new Date().toISOString()}], status:'open'})
    // optimistic update
    setConvos(prev=>[{id:ref.id,userId:user.uid,messages:[{from:'user',text:message}],status:'open'}, ...prev])
    setMessage('')
  }

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mt-6">الدعم</h2>
      <p className="text-gray-400">أرسل رسالة إلى فريق الدعم أو تحدث مع المساعد الآلي.</p>
      <div className="mt-4">
        <textarea value={message} onChange={e=>setMessage(e.target.value)} className="w-full p-3 rounded-md bg-white/6" placeholder="اكتب مشكلتك أو سؤالك..." />
        <div className="mt-2 flex gap-2">
          <button onClick={create} className="px-4 py-2 bg-icy text-black rounded-md">إرسال</button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {convos.map(c=> (
          <div key={c.id} className="card p-3">
            <div className="font-semibold">محادثة #{c.id}</div>
            <div className="text-sm text-gray-400">الحالة: {c.status}</div>
            <div className="mt-2 space-y-1">
              {c.messages.map((m:any,idx:number)=> (
                <div key={idx} className={`p-2 rounded ${m.from==='user' ? 'bg-white/6' : 'bg-icy text-black'}`}>{m.text}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
