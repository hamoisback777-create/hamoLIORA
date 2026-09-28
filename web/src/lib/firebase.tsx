import React, { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp, FirebaseApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

type FBContext = {
  app: FirebaseApp | null
  auth: ReturnType<typeof getAuth> | null
  db: ReturnType<typeof getFirestore> | null
  user: User | null
}

const ctx = createContext<FBContext>({app:null,auth:null,db:null,user:null})

export const FirebaseProvider: React.FC<{children:React.ReactNode}> = ({children})=>{
  const [app,setApp] = useState<FirebaseApp | null>(null)
  const [auth,setAuth] = useState<any>(null)
  const [db,setDb] = useState<any>(null)
  const [user,setUser] = useState<User | null>(null)

  useEffect(()=>{
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    }
    try{
      const a = initializeApp(firebaseConfig)
      const au = getAuth(a)
      const db = getFirestore(a)
      setApp(a)
      setAuth(au)
      setDb(db)
      onAuthStateChanged(au, u=> setUser(u))
    }catch(err){
      console.error('Firebase init error',err)
    }
  },[])

  return <ctx.Provider value={{app,auth,db,user}}>{children}</ctx.Provider>
}

export const useFirebase = ()=> useContext(ctx)
