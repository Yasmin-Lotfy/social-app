import React, { useState } from 'react'
import { AuthContext } from './authContext'

export default function AuthContextProvider({children}:{children : React.ReactNode}) {

      const [token, setToken] = useState<string | null>(localStorage.getItem("userToken") );
// console.log(AuthContext, "auth");



  return (
    <AuthContext.Provider value={ { token , setToken}}>{children}</AuthContext.Provider>
  )
}
