import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../state/cart'

export default function Header(){
  const {items} = useCart()
  const navigate = useNavigate()
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-transparent backdrop-blur-md header-safe">
      <div className="container flex items-center gap-4 py-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-2xl font-bold">LIORA</Link>
          <div className="text-sm text-gray-400">المتجر الرقمي</div>
        </div>
        <div className="flex-1">
          <div className="relative">
            <input onFocus={()=>navigate('/search')} placeholder="ابحث عن لعبة أو بطاقة أو منتج..." className="w-full rounded-full py-3 px-4 bg-white/6 placeholder:text-gray-400 text-white outline-none" />
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <button className="p-2 rounded-md hover:bg-white/3">🔔</button>
          <Link to="/wishlist" className="p-2 rounded-md hover:bg-white/3">♡</Link>
          <Link to="/cart" className="relative p-2 rounded-md hover:bg-white/3">
            🛒
            {items.length>0 && <span className="absolute -start-1 -top-1 bg-icy text-black text-xs px-2 rounded-full">{items.length}</span>}
          </Link>
          <Link to="/profile" className="p-2 rounded-md hover:bg-white/3">👤</Link>
        </nav>
      </div>
    </header>
  )
}
