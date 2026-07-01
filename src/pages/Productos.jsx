import React from 'react'
import { Helmet } from 'react-helmet-async'
import ItemListContainer from '../components/ItemListContainer'
export default function Productos(){
  return (
    <section>
      <Helmet>
        <title>Productos | Mi Tienda</title>
        <meta name="description" content="Catalogo de productos con busqueda en tiempo real y paginacion." />
      </Helmet>
      <h2>Productos</h2>
      <ItemListContainer />
    </section>
  )
}
