import { useEffect, useState } from 'react'
import { Product } from '../types'

const STORAGE_KEY = 'liora_wishlist'

export function useWishlist(){
  const [saved,setSaved] = useState<Record<string,Product>>({})
  useEffect(()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(raw) setSaved(JSON.parse(raw))
    }catch{}
  },[])
  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  },[saved])
  function toggle(product:Product){
    setSaved(prev=>{
      const copy = {...prev}
      if(copy[product.id]) delete copy[product.id]
      else copy[product.id]=product
      return copy
    })
  }
  function isSaved(id:string){
    return Boolean(saved[id])
  }
  return {saved,toggle,isSaved}
}
