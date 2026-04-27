import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CartContext'
export default function ProductoDetalle(){
  const { id } = useParams()
  const navegar = useNavigate()
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
    <div style={{textAlign:'center',maxWidth:'600px',margin:'2rem auto',padding:'1rem'}}>
      <h2>{producto.nombre}</h2>
      <img src={producto.imagen} alt="" width="200" />
      <p>{producto.descripcion}</p>
      <p style={{fontSize:'1.5rem',fontWeight:'bold'}}>${producto.precio}</p>
      <div style={{display:'flex',gap:'1rem',justifyContent:'center'}}>
        <button onClick={()=> agregarAlCarrito(producto,1)}>Agregar al carrito</button>
        <button onClick={()=> navegar('/productos')}>Volver a productos</button>
      </div>
    </div>
  )
}
