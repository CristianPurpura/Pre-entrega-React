import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useCarrito } from '../context/CartContext'

export default function Carrito(){
  const { carrito, quitarDelCarrito, vaciarCarrito, precioTotal } = useCarrito()

  if(carrito.length === 0) {
    return (
      <section>
        <Helmet>
          <title>Carrito | Mi Tienda</title>
          <meta name="description" content="Resumen de productos agregados al carrito de compras." />
        </Helmet>
        <h2>Carrito</h2>
        <p className="status">El carrito esta vacio.</p>
      </section>
    )
  }

  return (
    <section>
      <Helmet>
        <title>Carrito | Mi Tienda</title>
        <meta name="description" content="Resumen de productos agregados al carrito de compras." />
      </Helmet>

      <h2>Carrito</h2>
      {carrito.map(item => (
        <article key={item.producto.id} className="cart-item">
          <h3>{item.producto.nombre}</h3>
          <p>Cantidad: {item.cantidad}</p>
          <p>Precio unitario: ${item.producto.precio}</p>
          <button onClick={()=> quitarDelCarrito(item.producto.id)}>Quitar</button>
        </article>
      ))}

      <p className="price-large">Total: ${precioTotal()}</p>
      <button className="ghost-btn" onClick={vaciarCarrito}>Vaciar carrito</button>
    </section>
  )
}
