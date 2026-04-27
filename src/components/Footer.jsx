import React from 'react'
export default function Footer(){
  return (
    <footer>
      <div>
        <strong>Pre Entrega</strong>
        <p>Contacto: contacto@empresa.com | Tel: 123456789</p>
        <div className="footer-personas">
          <div className="persona">Nombre: Cristian<br/>Rol: Desarrolladora</div>
          <div className="persona">Nombre: Juan<br/>Rol: Diseñador</div>
          <div className="persona">Nombre: María<br/>Rol: Product Owner</div>
        </div>
      </div>
    </footer>
  )
}
