import { collection, getDocs, getDoc, doc, query, limit } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useFirebase } from './firebase'
import { Product } from '../types'

export function useProducts(opts:{limit?:number}={}){
  const {db} = useFirebase()
  const [products,setProducts] = useState<Product[]>([])
  useEffect(()=>{
    if(!db) return
    const q = query(collection(db,'products'), limit(opts.limit || 20))
    getDocs(q).then(snap=>{
      const arr:Product[] = []
      snap.forEach(doc=>{
        const data = doc.data() as any
        arr.push({id:doc.id,title:data.title || 'بدون اسم',category:data.category || 'عام',image:data.image || '/placeholder.png',price:data.price || 0,oldPrice:data.oldPrice,discount:data.discount,rating:data.rating,available: data.available!==false,description:data.description})
      })
      setProducts(arr)
    }).catch(err=>console.error(err))
  },[db])
  return {products}
}

export function useProduct(id:string){
  const {db} = useFirebase()
  const [product,setProduct] = useState<Product | null>(null)
  useEffect(()=>{
    if(!db || !id) return
    const ref = doc(db,'products',id)
    getDoc(ref).then(d=>{
      if(!d.exists()) return
      const data = d.data() as any
      setProduct({id:d.id,title:data.title,category:data.category,image:data.image,price:data.price,oldPrice:data.oldPrice,discount:data.discount,rating:data.rating,available: data.available!==false,description:data.description})
    })
  },[db,id])
  return {product}
}
