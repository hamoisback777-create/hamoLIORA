import React from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from '../lib/firebase'

export default function AdminRoute({children}:{children:JSX.Element}){
  const {user,isAdmin} = useFirebase()
  if(!user) return <Navigate to="/auth/login" replace />
  if(!isAdmin) return <Navigate to="/" replace />
  return children
}
