import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { missingFirebaseEnvKeys } from '../firebase/config'

export default function Login() {
  const navegar = useNavigate()
  const { login, registro, isFirebaseConfigured } = useAuth()
  const [modoRegistro, setModoRegistro] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    setError('')
    setCargando(true)

    try {
      if (modoRegistro) {
        await registro(email, password)
      } else {
        await login(email, password)
      }
      navegar('/admin')
    } catch (err) {
      setError(err.message || 'No fue posible autenticarte')
    } finally {
      setCargando(false)
    }
  }

  return (
    <section className="auth-page">
      <Helmet>
        <title>Login | Mi Tienda</title>
        <meta name="description" content="Ingreso y registro de usuarios para administrar productos." />
      </Helmet>

      <div className="auth-card">
        <h2>{modoRegistro ? 'Crear cuenta' : 'Iniciar sesion'}</h2>
        <p className="muted">
          {isFirebaseConfigured
            ? 'Autenticacion conectada con Firebase.'
            : `Sin variables de Firebase: se usa modo local de prueba. Faltan: ${missingFirebaseEnvKeys.join(', ') || 'ninguna'}`}
        </p>

        <form onSubmit={onSubmit} className="auth-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          {error ? <p className="status error">{error}</p> : null}

          <button type="submit" disabled={cargando}>
            {cargando ? 'Procesando...' : modoRegistro ? 'Registrarme' : 'Ingresar'}
          </button>
        </form>

        <button className="ghost-btn" onClick={() => setModoRegistro((v) => !v)}>
          {modoRegistro ? 'Ya tengo cuenta' : 'No tengo cuenta'}
        </button>
      </div>
    </section>
  )
}
