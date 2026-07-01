import React from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export default function Footer(){
  return (
    <footer>
      <Container className="footer-content">
        <strong>Pre Entrega Final</strong>
        <p>Contacto: contacto@mitienda.com | Tel: +54 11 1234 5678</p>
        <Row className="footer-personas">
          <Col md={4} sm={6}><div className="persona">Nombre: Cristian<br/>Rol: Desarrollador</div></Col>
          <Col md={4} sm={6}><div className="persona">Nombre: Juan<br/>Rol: Diseñador</div></Col>
          <Col md={4} sm={12}><div className="persona">Nombre: Maria<br/>Rol: Product Owner</div></Col>
        </Row>
      </Container>
    </footer>
  )
}
