import React, { createContext, useContext, useState, useCallback } from 'react'

type Toast = {id:string,message:string}

type ToastContextValue = {
  toasts: Toast[]
  push: (message:string, ttl?:number)=>void
}

const ctx = createContext<ToastContextValue | undefined>(undefined)

export const ToastProvider: React.FC<{children:React.ReactNode}> = ({children})=>{
  const [toasts,setToasts] = useState<Toast[]>([])

  const push = useCallback((message:string, ttl=2000)=>{
    const id = Math.random().toString(36).slice(2)
    setToasts(t=>[...t, {id,message}])
    setTimeout(()=>{
      setToasts(t=>t.filter(x=>x.id!==id))
    }, ttl)
  },[])

  return <ctx.Provider value={{toasts,push}}>{children}</ctx.Provider>
}

export const useToasts = ()=>{
  const v = useContext(ctx)
  if(!v) throw new Error('useToasts must be used within ToastProvider')
  return v
}
