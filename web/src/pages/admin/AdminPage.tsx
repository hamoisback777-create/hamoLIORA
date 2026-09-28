import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AdminProducts from './admin/AdminProducts'
import AdminOrders from './admin/AdminOrders'
import AdminDashboard from './admin/AdminDashboard'

export default function AdminPage(){
  return (
    <div className="container mt-6">
      <div className="grid grid-cols-4 gap-4">
        <aside className="col-span-1 card p-4">
          <nav className="flex flex-col gap-2">
            <Link to="/admin">لوحة التحكم</Link>
            <Link to="/admin/products">المنتجات</Link>
            <Link to="/admin/orders">الطلبات</Link>
          </nav>
        </aside>
        <main className="col-span-3">
          <Routes>
            <Route path="/" element={<AdminDashboard/>} />
            <Route path="/products" element={<AdminProducts/>} />
            <Route path="/orders" element={<AdminOrders/>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
