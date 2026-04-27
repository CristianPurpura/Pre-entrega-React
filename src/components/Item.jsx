import React from 'react'
import { Link } from 'react-router-dom'
export default function Item({producto}){
  return (
    <div className="producto">
      <img src={producto.imagen} alt={producto.nombre} width="150" height="150" />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>${producto.precio}</p>
      <Link to={`/producto/${producto.id}`}>Ver detalle</Link>
    </div>
  )
}
