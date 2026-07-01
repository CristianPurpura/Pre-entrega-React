import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { ProveedorCarrito } from './context/CartContext'
import { ProveedorAuth } from './context/AuthContext'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ProveedorAuth>
        <ProveedorCarrito>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ProveedorCarrito>
      </ProveedorAuth>
    </HelmetProvider>
  </React.StrictMode>
)
