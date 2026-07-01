import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartWidget from './CartWidget'
import { useAuth } from '../context/AuthContext'

export default function Header(){
  const { usuario, logout } = useAuth()
  const navegar = useNavigate()

  async function salir() {
    await logout()
    navegar('/')
  }

  return (
    <header>
      <div className="header-inner">
        <h1>Mi Tienda Tech</h1>
        <nav className="main-nav">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          {usuario ? <Link to="/perfil">Perfil</Link> : null}
          {usuario ? <Link to="/admin">Panel</Link> : null}
          {!usuario ? <Link to="/login">Login</Link> : null}
          {usuario ? <button onClick={salir}>Salir</button> : null}
          <CartWidget />
        </nav>
      </div>
    </header>
  )
}
