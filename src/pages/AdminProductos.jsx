import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaEdit, FaPlus, FaTrashAlt } from 'react-icons/fa'
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct
} from '../services/productService'

const initialForm = {
  nombre: '',
  descripcion: '',
  precio: '',
  imagen: ''
}

export default function AdminProductos() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [modoEdicionId, setModoEdicionId] = useState(null)
  const [form, setForm] = useState(initialForm)
  const [productoAEliminar, setProductoAEliminar] = useState(null)

  async function cargarProductos() {
    setCargando(true)
    setError('')
    try {
      const data = await getProducts()
      setProductos(data)
    } catch (err) {
      setError(err.message || 'No se pudo cargar el catalogo')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  const tituloFormulario = useMemo(
    () => (modoEdicionId ? 'Editar producto' : 'Agregar producto'),
    [modoEdicionId]
  )

  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function validarForm() {
    if (!form.nombre.trim()) {
      return 'El nombre es obligatorio.'
    }
    if (Number(form.precio) <= 0) {
      return 'El precio debe ser mayor a 0.'
    }
    return null
  }

  async function onSubmit(event) {
    event.preventDefault()
    const validation = validarForm()

    if (validation) {
      setError(validation)
      return
    }

    setError('')

    try {
      if (modoEdicionId) {
        await updateProduct(modoEdicionId, form)
      } else {
        await createProduct(form)
      }
      setForm(initialForm)
      setModoEdicionId(null)
      await cargarProductos()
    } catch (err) {
      setError(err.message || 'No se pudo guardar el producto')
    }
  }

  function empezarEdicion(producto) {
    setModoEdicionId(producto.id)
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: String(producto.precio),
      imagen: producto.imagen
    })
  }

  function cancelarEdicion() {
    setModoEdicionId(null)
    setForm(initialForm)
  }

  async function confirmarEliminacion() {
    if (!productoAEliminar) {
      return
    }

    try {
      await deleteProduct(productoAEliminar.id)
      setProductoAEliminar(null)
      await cargarProductos()
    } catch (err) {
      setError(err.message || 'No se pudo eliminar el producto')
    }
  }

  return (
    <section>
      <Helmet>
        <title>Panel Admin | Mi Tienda</title>
        <meta
          name="description"
          content="Panel de administracion de productos con operaciones CRUD y validaciones."
        />
      </Helmet>

      <h2>Panel de productos</h2>
      <p className="muted">Alta, edicion y eliminacion con validaciones.</p>

      {error ? <p className="status error">{error}</p> : null}

      <div className="admin-grid">
        <form onSubmit={onSubmit} className="product-form">
          <h3>{tituloFormulario}</h3>

          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            value={form.nombre}
            onChange={(e) => setField('nombre', e.target.value)}
            required
          />

          <label htmlFor="descripcion">Descripcion</label>
          <textarea
            id="descripcion"
            rows={3}
            value={form.descripcion}
            onChange={(e) => setField('descripcion', e.target.value)}
          />

          <label htmlFor="precio">Precio</label>
          <input
            id="precio"
            type="number"
            min="1"
            value={form.precio}
            onChange={(e) => setField('precio', e.target.value)}
            required
          />

          <label htmlFor="imagen">URL imagen</label>
          <input
            id="imagen"
            value={form.imagen}
            onChange={(e) => setField('imagen', e.target.value)}
            placeholder="https://..."
          />

          <div className="actions-row">
            <button type="submit">
              {modoEdicionId ? <FaEdit /> : <FaPlus />} {modoEdicionId ? 'Actualizar' : 'Crear'}
            </button>
            {modoEdicionId ? (
              <button type="button" className="ghost-btn" onClick={cancelarEdicion}>
                Cancelar
              </button>
            ) : null}
          </div>
        </form>

        <div>
          <h3>Productos</h3>
          {cargando ? <p className="status">Cargando productos...</p> : null}
          {!cargando && productos.length === 0 ? <p className="status">No hay productos.</p> : null}

          <div className="admin-list">
            {productos.map((producto) => (
              <article key={producto.id} className="admin-item">
                <div>
                  <strong>{producto.nombre}</strong>
                  <p>${producto.precio}</p>
                </div>
                <div className="actions-row">
                  <button type="button" onClick={() => empezarEdicion(producto)}>
                    <FaEdit /> Editar
                  </button>
                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() => setProductoAEliminar(producto)}
                  >
                    <FaTrashAlt /> Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {productoAEliminar ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3>Confirmar eliminacion</h3>
            <p>
              Se eliminara <strong>{productoAEliminar.nombre}</strong>. Esta accion no se puede deshacer.
            </p>
            <div className="actions-row">
              <button className="danger-btn" onClick={confirmarEliminacion}>
                Eliminar
              </button>
              <button className="ghost-btn" onClick={() => setProductoAEliminar(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
