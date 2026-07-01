import React, { useEffect, useMemo, useState } from 'react'
import Item from './Item'
import { getProducts } from '../services/productService'

export default function ItemListContainer(){
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [paginaActual, setPaginaActual] = useState(1)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const productosPorPagina = 4

  useEffect(()=>{
    let activo = true

    async function cargar() {
      setCargando(true)
      setError('')
      try {
        const data = await getProducts()
        if (activo) {
          setProductos(data)
        }
      } catch (err) {
        if (activo) {
          setError(err.message || 'No se pudieron obtener los productos.')
        }
      } finally {
        if (activo) {
          setCargando(false)
        }
      }
    }

    cargar()

    return () => {
      activo = false
    }
  },[])

  useEffect(() => {
    setPaginaActual(1)
  }, [busqueda])

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    if (!texto) {
      return productos
    }

    return productos.filter((p) => {
      const nombre = p.nombre.toLowerCase()
      const descripcion = p.descripcion.toLowerCase()
      return nombre.includes(texto) || descripcion.includes(texto)
    })
  }, [productos, busqueda])

  const totalPaginas = Math.max(1, Math.ceil(productosFiltrados.length / productosPorPagina))
  const inicio = (paginaActual - 1) * productosPorPagina
  const productosPaginados = productosFiltrados.slice(inicio, inicio + productosPorPagina)

  function irAPagina(pagina) {
    setPaginaActual(Math.min(Math.max(1, pagina), totalPaginas))
  }

  return (
    <section>
      <div className="catalog-toolbar">
        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre o descripcion..."
          aria-label="Buscar productos"
        />
        <small>{productosFiltrados.length} resultados</small>
      </div>

      {cargando ? <p className="status">Cargando productos...</p> : null}
      {error ? <p className="status error">{error}</p> : null}
      {!cargando && !error && productosFiltrados.length === 0 ? (
        <p className="status">No se encontraron productos para esa busqueda.</p>
      ) : null}

      <div className="product-grid">
        {productosPaginados.map(p=> <Item key={p.id} producto={p} />)}
      </div>

      {!cargando && !error && productosFiltrados.length > productosPorPagina ? (
        <div className="pagination" aria-label="Paginacion de productos">
          <button onClick={() => irAPagina(paginaActual - 1)} disabled={paginaActual === 1}>
            Anterior
          </button>
          <span>Pagina {paginaActual} de {totalPaginas}</span>
          <button onClick={() => irAPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
            Siguiente
          </button>
        </div>
      ) : null}
    </section>
  )
}
