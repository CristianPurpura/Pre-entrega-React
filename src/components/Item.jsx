import React from 'react'
import { Link } from 'react-router-dom'
export default function Item({producto}){
  return (
    <article className="producto">
      <img src={producto.imagen} alt={producto.nombre} width="150" height="150" loading="lazy" />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p className="price">${producto.precio}</p>
      <Link className="link-btn" to={`/producto/${producto.id}`}>Ver detalle</Link>
    </article>
  )
}
