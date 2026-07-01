import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../context/AuthContext'

export default function Perfil() {
  const { usuario, isFirebaseConfigured } = useAuth()

  return (
    <section>
      <Helmet>
        <title>Perfil | Mi Tienda</title>
        <meta name="description" content="Perfil de usuario autenticado." />
      </Helmet>

      <h2>Perfil</h2>
      <p>Usuario: {usuario?.email}</p>
      <p className="muted">
        Estado de autenticacion: {isFirebaseConfigured ? 'Firebase activo' : 'Modo local de prueba'}
      </p>
    </section>
  )
}
