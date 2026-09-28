import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AdminProducts from './admin/AdminProducts'
import AdminOrders from './admin/AdminOrders'
import AdminDashboard from './admin/AdminDashboard'
import AdminProductForm from './admin/AdminProductForm'

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
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="/admin/products" element={<AdminProducts/>} />
            <Route path="/admin/products/new" element={<AdminProductForm/>} />
            <Route path="/admin/products/edit/:id" element={<AdminProductForm edit/>} />
            <Route path="/admin/orders" element={<AdminOrders/>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
