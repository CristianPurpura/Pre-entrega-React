import React, { useEffect, useState } from 'react'
import Item from './Item'
export default function ItemListContainer(){
  const [productos, setProductos] = useState([])
  useEffect(()=>{
    fetch('/productos.json')
      .then(res=>res.json())
      .then(data=>setProductos(data))
  },[])
  return (
    <div>
      {productos.map(p=> <Item key={p.id} producto={p} />)}
    </div>
  )
}
