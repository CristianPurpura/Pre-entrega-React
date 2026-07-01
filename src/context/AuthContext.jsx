import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../firebase/config'

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function ProveedorAuth({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsub = onAuthStateChanged(auth, (user) => {
        setUsuario(user)
        setCargando(false)
      })
      return unsub
    }

    const guardado = localStorage.getItem('mock_user_email')
    if (guardado) {
      setUsuario({ email: guardado, uid: guardado })
    }
    setCargando(false)
    return undefined
  }, [])

  async function login(email, password) {
    if (isFirebaseConfigured && auth) {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      return cred.user
    }

    if (!email || password.length < 6) {
      throw new Error('Credenciales invalidas. Password minimo: 6 caracteres.')
    }

    localStorage.setItem('mock_user_email', email)
    const mock = { email, uid: email }
    setUsuario(mock)
    return mock
  }

  async function registro(email, password) {
    if (isFirebaseConfigured && auth) {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      return cred.user
    }

    if (!email || password.length < 6) {
      throw new Error('Registro invalido. Password minimo: 6 caracteres.')
    }

    localStorage.setItem('mock_user_email', email)
    const mock = { email, uid: email }
    setUsuario(mock)
    return mock
  }

  async function logout() {
    if (isFirebaseConfigured && auth) {
      await signOut(auth)
      return
    }

    localStorage.removeItem('mock_user_email')
    setUsuario(null)
  }

  const value = useMemo(
    () => ({ usuario, cargando, login, registro, logout, isFirebaseConfigured }),
    [usuario, cargando]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
