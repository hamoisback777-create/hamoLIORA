import React from 'react'
import { useToasts } from '../context/ToastContext'

export default function ToastContainer(){
  const {toasts} = useToasts()
  return (
    <div className="fixed bottom-6 inset-x-0 flex flex-col items-center gap-2 pointer-events-none z-50">
      {toasts.map(t=> (
        <div key={t.id} className="pointer-events-auto bg-[#0b0f14] text-white border border-[#1b2730] px-4 py-2 rounded-md shadow-md animate-slide-up">
          {t.message}
        </div>
      ))}
    </div>
  )
}
