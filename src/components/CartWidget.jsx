import React from 'react'
import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CartContext'
export default function CartWidget(){
  const { cantidadTotal } = useCarrito()
  return (
    <Link to="/carrito" style={{marginLeft:10,color:'#fff'}}>Carrito ({cantidadTotal()})</Link>
  )
}
