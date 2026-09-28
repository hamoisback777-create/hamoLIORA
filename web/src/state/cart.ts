import React, { createContext, useContext, useEffect, useState } from 'react'
import { Product } from '../types'

type CartItem = Product & { quantity: number }

type CartContextValue = {
  items: CartItem[]
  add: (p: Product, qty?: number) => void
  remove: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
  subtotal: number
}

const ctx = createContext<CartContextValue | undefined>(undefined)

export const CartProvider: React.FC<{children: React.ReactNode}> = ({children})=>{
  const [items,setItems] = useState<CartItem[]>([])

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('liora_cart')
      if(raw) setItems(JSON.parse(raw))
    }catch{}
  },[])

  useEffect(()=>{
    localStorage.setItem('liora_cart', JSON.stringify(items))
  },[items])

  function add(p:Product, qty=1){
    setItems(prev=>{
      const found = prev.find(i=>i.id===p.id)
      if(found) return prev.map(i=> i.id===p.id? {...i, quantity: i.quantity + qty} : i)
      return [...prev, {...p, quantity: qty}]
    })
  }
  function remove(id:string){
    setItems(prev=>prev.filter(i=>i.id!==id))
  }
  function updateQty(id:string, qty:number){
    if(qty<=0) return remove(id)
    setItems(prev=>prev.map(i=> i.id===id? {...i, quantity: qty} : i))
  }
  function clear(){ setItems([]) }

  const subtotal = items.reduce((s,c)=> s + (c.price * c.quantity), 0)

  return <ctx.Provider value={{items,add,remove,updateQty,clear,subtotal}}>{children}</ctx.Provider>
}

export function useCart(){
  const v = useContext(ctx)
  if(!v) throw new Error('useCart must be used inside CartProvider')
  return v
}
