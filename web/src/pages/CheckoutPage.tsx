import React, { useState } from 'react'
import { useCart } from '../state/cart'

export default function CheckoutPage(){
  const {items,subtotal,clear} = useCart()
  const [step,setStep] = useState(1)
  const [info,setInfo] = useState({name:'',email:'',phone:''})
  const [method,setMethod] = useState('Vodafone Cash')

  function confirmOrder(){
    // For manual payments: create order in Firestore (if available) and show instructions
    // Here we'll simply simulate success and clear cart
    clear()
    setStep(3)
  }

  if(items.length===0) return <div className="container p-6">السلة فارغة</div>

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mt-6">الدفع</h2>
      <div className="mt-4 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 card p-4">
          {step===1 && (
            <div>
              <h3 className="font-semibold">معلومات العميل</h3>
              <div className="mt-3 grid gap-3">
                <input value={info.name} onChange={e=>setInfo({...info,name:e.target.value})} placeholder="الاسم" className="p-3 rounded bg-white/6" />
                <input value={info.email} onChange={e=>setInfo({...info,email:e.target.value})} placeholder="البريد الإلكتروني" className="p-3 rounded bg-white/6" />
                <input value={info.phone} onChange={e=>setInfo({...info,phone:e.target.value})} placeholder="الهاتف" className="p-3 rounded bg-white/6" />
              </div>
              <div className="mt-4 flex gap-3">
                <button onClick={()=>setStep(2)} className="px-4 py-2 bg-icy text-black rounded-md">التالي</button>
              </div>
            </div>
          )}

          {step===2 && (
            <div>
              <h3 className="font-semibold">طريقة الدفع</h3>
              <div className="mt-3 flex flex-col gap-2">
                {['Vodafone Cash','Orange Cash','Fawry','InstaPay'].map(m=> (
                  <label key={m} className="p-3 border rounded cursor-pointer flex items-center justify-between">
                    <div>{m}</div>
                    <input type="radio" name="method" checked={method===m} onChange={()=>setMethod(m)} />
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <button onClick={confirmOrder} className="px-4 py-2 bg-icy text-black rounded-md">تأكيد الطلب</button>
                <button onClick={()=>setStep(1)} className="px-4 py-2 border rounded-md mr-2">رجوع</button>
              </div>
            </div>
          )}

          {step===3 && (
            <div>
              <h3 className="font-semibold">تعليمات الدفع: {method}</h3>
              <div className="mt-3 card p-3">
                <p className="text-gray-400">اتبع تعليمات الدفع الخاصة بـ {method}. بعد التأكد من الدفع، سيقوم فريق الدعم بتأكيد طلبك يدويًا.</p>
                <p className="mt-2">معلومات الحساب: <strong>رقم الحساب/اسم المحفظة</strong> (يتم توفيرها من قبل البائع)</p>
              </div>
            </div>
          )}
        </div>

        <aside className="card p-4">
          <div className="font-semibold">ملخص الطلب</div>
          <div className="mt-4 space-y-2">
            {items.map(i=> (
              <div key={i.id} className="flex justify-between"><div>{i.title} x{i.quantity}</div><div>{(i.price*i.quantity).toFixed(2)}$</div></div>
            ))}
            <div className="border-t pt-2 flex justify-between font-bold">المجموع: <span>{subtotal.toFixed(2)}$</span></div>
          </div>
        </aside>
      </div>
    </div>
  )
}
