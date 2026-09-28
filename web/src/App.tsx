import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import SearchPage from './pages/SearchPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/admin/AdminPage'
import Header from './components/Header'
import ToastContainer from './components/ToastContainer'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import WishlistPage from './pages/WishlistPage'
import OrdersPage from './pages/OrdersPage'
import SupportPage from './pages/SupportPage'

export default function App(){
  return (
    <div className="min-h-screen bg-graphite text-white font-cairo" dir="rtl">
      <Header />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:id" element={<ProductPage/>} />
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage/></ProtectedRoute>} />
          <Route path="/auth/*" element={<AuthPage/>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><WishlistPage/></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrdersPage/></ProtectedRoute>} />
          <Route path="/support" element={<ProtectedRoute><SupportPage/></ProtectedRoute>} />
          <Route path="/admin/*" element={<AdminRoute><AdminPage/></AdminRoute>} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  )
}
