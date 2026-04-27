import React from 'react'
import { useCarrito } from '../context/CartContext'
export default function Carrito(){
  const { carrito, quitarDelCarrito } = useCarrito()
  if(carrito.length === 0) return <div><h2>Carrito</h2><p>El carrito está vacío.</p></div>
  return (
    <div>
      <h2>Carrito</h2>
      {carrito.map(item => (
        <div key={item.producto.id} style={{border:'1px solid #ddd',padding:8,marginBottom:8}}>
          <h3>{item.producto.nombre}</h3>
          <p>Cantidad: {item.cantidad}</p>
          <p>Precio unitario: ${item.producto.precio}</p>
          <button onClick={()=> quitarDelCarrito(item.producto.id)}>Quitar</button>
        </div>
      ))}
    </div>
  )
}
