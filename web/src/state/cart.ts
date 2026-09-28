import { useState } from 'react'
import { Product } from '../types'

export function useCart(){
  const [items,setItems] = useState<Product[]>([])
  function add(p:Product){
    setItems(prev=>[...prev,p])
  }
  function remove(id:string){
    setItems(prev=>prev.filter(i=>i.id!==id))
  }
  return {items,add,remove}
}
