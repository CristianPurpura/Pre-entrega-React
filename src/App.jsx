import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

const Home = lazy(() => import('./pages/Home'))
const Productos = lazy(() => import('./pages/Productos'))
const ProductoDetalle = lazy(() => import('./pages/ProductoDetalle'))
const Carrito = lazy(() => import('./pages/Carrito'))
const Login = lazy(() => import('./pages/Login'))
const AdminProductos = lazy(() => import('./pages/AdminProductos'))
const Perfil = lazy(() => import('./pages/Perfil'))

export default function App(){
  return (
    <Layout>
      <Suspense fallback={<p className="status">Cargando vista...</p>}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/productos" element={<Productos/>} />
          <Route path="/producto/:id" element={<ProductoDetalle/>} />
          <Route path="/carrito" element={<Carrito/>} />
          <Route path="/login" element={<Login/>} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminProductos/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Layout>
  )
}
