import React, { createContext, useContext, useState } from 'react'
const CartContext = createContext()
export function useCarrito(){ return useContext(CartContext) }
export function ProveedorCarrito({children}){
  const [carrito, setCarrito] = useState([])
  function agregarAlCarrito(producto, cantidad=1){
    setCarrito(prev=>{
      const existe = prev.find(p=>p.producto.id===producto.id)
      if(existe){
        return prev.map(p=> p.producto.id===producto.id ? {...p, cantidad: p.cantidad + cantidad} : p)
      }
      return [...prev, {producto, cantidad}]
    })
  }
  function quitarDelCarrito(id){
    setCarrito(prev=> prev.filter(p=> p.producto.id !== id))
  }
  function vaciarCarrito(){
    setCarrito([])
  }
  function cantidadTotal(){
    return carrito.reduce((s, i)=> s + i.cantidad, 0)
  }
  function precioTotal(){
    return carrito.reduce((s, i)=> s + i.cantidad * i.producto.precio, 0)
  }
  return (
    <CartContext.Provider value={{carrito, agregarAlCarrito, quitarDelCarrito, vaciarCarrito, cantidadTotal, precioTotal}}>
      {children}
    </CartContext.Provider>
  )
}
