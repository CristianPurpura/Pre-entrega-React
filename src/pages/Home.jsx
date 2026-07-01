import React from 'react'
import { Helmet } from 'react-helmet-async'
import HeroCard from '../components/StyledHero'

export default function Home(){
  return (
    <HeroCard>
      <Helmet>
        <title>Inicio | Mi Tienda</title>
        <meta
          name="description"
          content="Ecommerce de tecnologia con carrito, panel de productos, busqueda y paginacion."
        />
      </Helmet>
      <h2>Bienvenido</h2>
      <p className="hero-text">Catalogo de tecnologia con experiencia optimizada para desktop y mobile.</p>
    </HeroCard>
  )
}
