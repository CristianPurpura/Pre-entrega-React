import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCarrito } from '../context/CartContext'
export default function ProductoDetalle(){
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const { agregarAlCarrito } = useCarrito()
  useEffect(()=>{
    fetch('/productos.json')
      .then(r=>r.json())
      .then(datos=>{
        const p = datos.find(x=> x.id === id)
        setProducto(p)
      })
  },[id])
  if(!producto) return <div>Cargando...</div>
  return (
    <div>
      <h2>{producto.nombre}</h2>
      <img src={producto.imagen} alt="" width="200" />
      <p>{producto.descripcion}</p>
      <p>${producto.precio}</p>
      <button onClick={()=> agregarAlCarrito(producto,1)}>Agregar al carrito</button>
    </div>
  )
}
