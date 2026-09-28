import React from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from '../lib/firebase'

export default function ProtectedRoute({children}:{children:JSX.Element}){
  const {user} = useFirebase()
  if(!user) return <Navigate to="/auth/login" replace />
  return children
}
