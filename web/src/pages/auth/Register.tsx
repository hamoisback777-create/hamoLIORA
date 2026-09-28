import React from 'react'

export default function Register(){
  return (
    <div className="max-w-md mx-auto mt-8 card p-6">
      <h2 className="text-2xl font-semibold mb-4">إنشاء حساب</h2>
      <form className="flex flex-col gap-3">
        <input placeholder="اسم المستخدم" className="p-3 rounded-md bg-white/6" />
        <input placeholder="البريد الإلكتروني" className="p-3 rounded-md bg-white/6" />
        <input placeholder="الهاتف" className="p-3 rounded-md bg-white/6" />
        <input placeholder="كلمة المرور" type="password" className="p-3 rounded-md bg-white/6" />
        <input placeholder="تأكيد كلمة المرور" type="password" className="p-3 rounded-md bg-white/6" />
        <button className="mt-2 px-4 py-3 bg-icy text-black rounded-md">سجل</button>
      </form>
    </div>
  )
}
