import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget'
export default function Header(){
  return (
    <header>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1>Mi Tienda</h1>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <CartWidget />
        </nav>
      </div>
    </header>
  )
}
