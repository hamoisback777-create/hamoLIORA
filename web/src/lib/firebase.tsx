import React, { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp, FirebaseApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'

type FBContext = {
  app: FirebaseApp | null
  auth: ReturnType<typeof getAuth> | null
  db: ReturnType<typeof getFirestore> | null
  user: User | null
  register: (payload:{username:string,email:string,phone?:string,password:string}) => Promise<User | null>
  login: (identifier:string,password:string) => Promise<User | null>
  logout: () => Promise<void>
  isAdmin: boolean
}

const ctx = createContext<FBContext>({app:null,auth:null,db:null,user:null,register:async()=>null,login:async()=>null,logout:async()=>{},isAdmin:false})

export const FirebaseProvider: React.FC<{children:React.ReactNode}> = ({children})=>{
  const [app,setApp] = useState<FirebaseApp | null>(null)
  const [auth,setAuth] = useState<any>(null)
  const [db,setDb] = useState<any>(null)
  const [user,setUser] = useState<User | null>(null)
  const [isAdmin,setIsAdmin] = useState(false)

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
      onAuthStateChanged(au, async (u)=>{
        setUser(u)
        if(u && db){
          try{
            const ud = await getDoc(doc(db,'users',u.uid))
            const data = ud.exists() ? ud.data() as any : null
            setIsAdmin(Boolean(data && data.role === 'admin'))
          }catch(err){
            console.error('user doc read error',err)
            setIsAdmin(false)
          }
        }else{
          setIsAdmin(false)
        }
      })
    }catch(err){
      console.error('Firebase init error',err)
    }
  },[])

  async function register(payload:{username:string,email:string,phone?:string,password:string}){
    if(!auth || !db) throw new Error('Firebase not initialized')
    const {username,email,phone,password} = payload
    const cred = await createUserWithEmailAndPassword(auth,email,password)
    const u = cred.user
    // update displayName
    await updateProfile(u,{displayName:username})
    // create user document
    await setDoc(doc(db,'users',u.uid),{username, email, phone, role: 'customer', createdAt: new Date().toISOString()})
    return u
  }

  async function login(identifier:string,password:string){
    if(!auth) throw new Error('Firebase not initialized')
    // allow login by email or username: default to email
    // For username support we'd need to map username->email via users collection; keep simple: treat identifier as email
    const cred = await signInWithEmailAndPassword(auth,identifier,password)
    return cred.user
  }

  async function logout(){
    if(!auth) return
    await signOut(auth)
  }

  return <ctx.Provider value={{app,auth,db,user,register,login,logout,isAdmin}}>{children}</ctx.Provider>
}

export const useFirebase = ()=> useContext(ctx)
