import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useCarrito } from '../context/CartContext'
import { getProductById } from '../services/productService'

export default function ProductoDetalle(){
  const { id } = useParams()
  const navegar = useNavigate()
  const [producto, setProducto] = useState(null)
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(true)
  const { agregarAlCarrito } = useCarrito()

  useEffect(()=>{
    let activo = true

    async function cargarDetalle() {
      setCargando(true)
      setError('')
      try {
        const p = await getProductById(id)
        if (activo) {
          setProducto(p)
        }
      } catch (err) {
        if (activo) {
          setError(err.message || 'No se pudo cargar el detalle del producto.')
        }
      } finally {
        if (activo) {
          setCargando(false)
        }
      }
    }

    cargarDetalle()

    return () => {
      activo = false
    }
  },[id])

  if(cargando) return <p className="status">Cargando...</p>
  if(error) return <p className="status error">{error}</p>
  if(!producto) return <p className="status">Producto no encontrado.</p>

  return (
    <div className="detail-card">
      <Helmet>
        <title>{producto.nombre} | Mi Tienda</title>
        <meta name="description" content={producto.descripcion} />
      </Helmet>

      <h2>{producto.nombre}</h2>
      <img src={producto.imagen} alt="" width="200" />
      <p>{producto.descripcion}</p>
      <p className="price-large">${producto.precio}</p>
      <div className="actions-row center">
        <button onClick={()=> agregarAlCarrito(producto,1)}>Agregar al carrito</button>
        <button onClick={()=> navegar('/productos')}>Volver a productos</button>
      </div>
    </div>
  )
}
