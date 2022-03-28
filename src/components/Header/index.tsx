import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand href="/">CRUD-Tarefas</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Item as={Link} className="nav-link" to="/">Home</Nav.Item>
                <Nav.Item as={Link} className="nav-link" to="/tarefas">Tarefas</Nav.Item>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
