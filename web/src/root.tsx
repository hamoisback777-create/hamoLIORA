import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'
import './styles.toast.css'
import { FirebaseProvider } from './lib/firebase'
import { CartProvider } from './state/cart'
import { ToastProvider } from './context/ToastContext'

export default function Root(){
  return (
    <BrowserRouter>
      <FirebaseProvider>
        <CartProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </CartProvider>
      </FirebaseProvider>
    </BrowserRouter>
  )
}
