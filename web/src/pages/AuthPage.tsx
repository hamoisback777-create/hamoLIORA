import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'

export default function AuthPage(){
  return (
    <div className="container">
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<Login/>} />
      </Routes>
    </div>
  )
}
