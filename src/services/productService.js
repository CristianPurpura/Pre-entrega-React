import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase/config'

const STORAGE_KEY = 'productos_locales'

function normalizeProduct(producto) {
  return {
    id: String(producto.id),
    nombre: producto.nombre?.trim() || '',
    descripcion: producto.descripcion?.trim() || '',
    precio: Number(producto.precio) || 0,
    imagen: producto.imagen?.trim() || 'https://via.placeholder.com/150?text=Producto'
  }
}

async function getLocalProducts() {
  const guardados = localStorage.getItem(STORAGE_KEY)

  if (guardados) {
    return JSON.parse(guardados)
  }

  const res = await fetch('/productos.json')
  if (!res.ok) {
    throw new Error('No se pudieron cargar los productos iniciales')
  }

  const data = await res.json()
  const normalizados = data.map(normalizeProduct)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizados))
  return normalizados
}

function saveLocalProducts(productos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos))
}

export async function getProducts() {
  if (isFirebaseConfigured) {
    const q = query(collection(db, 'productos'), orderBy('nombre', 'asc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((docSnap) => normalizeProduct({ id: docSnap.id, ...docSnap.data() }))
  }

  return getLocalProducts()
}

export async function getProductById(id) {
  const productos = await getProducts()
  return productos.find((p) => p.id === String(id)) || null
}

export async function createProduct(producto) {
  const nuevo = normalizeProduct(producto)

  if (!nuevo.nombre || nuevo.precio <= 0) {
    throw new Error('Validacion: nombre obligatorio y precio mayor a 0')
  }

  if (isFirebaseConfigured) {
    const result = await addDoc(collection(db, 'productos'), {
      nombre: nuevo.nombre,
      descripcion: nuevo.descripcion,
      precio: nuevo.precio,
      imagen: nuevo.imagen
    })
    return { ...nuevo, id: result.id }
  }

  const productos = await getLocalProducts()
  const id = crypto.randomUUID()
  const productoCreado = { ...nuevo, id }
  const actualizados = [...productos, productoCreado]
  saveLocalProducts(actualizados)
  return productoCreado
}

export async function updateProduct(id, producto) {
  const cambios = normalizeProduct({ ...producto, id })

  if (!cambios.nombre || cambios.precio <= 0) {
    throw new Error('Validacion: nombre obligatorio y precio mayor a 0')
  }

  if (isFirebaseConfigured) {
    await setDoc(doc(db, 'productos', String(id)), {
      nombre: cambios.nombre,
      descripcion: cambios.descripcion,
      precio: cambios.precio,
      imagen: cambios.imagen
    })
    return cambios
  }

  const productos = await getLocalProducts()
  const actualizados = productos.map((item) => (item.id === String(id) ? cambios : item))
  saveLocalProducts(actualizados)
  return cambios
}

export async function deleteProduct(id) {
  if (isFirebaseConfigured) {
    await deleteDoc(doc(db, 'productos', String(id)))
    return
  }

  const productos = await getLocalProducts()
  const actualizados = productos.filter((item) => item.id !== String(id))
  saveLocalProducts(actualizados)
}
