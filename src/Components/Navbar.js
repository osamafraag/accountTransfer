import React from 'react'
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {
    return (
      <Navbar collapseOnSelect expand="lg" className="shadow-sm bg-white position-sticky top-0 start-0 py-3" style={{ zIndex: "1000" }}>
        <Container className="px-5">
          <NavLink className='text-uppercase fw-bold text-dark text-decoration-none me-5 fs-4' to="/"> Docspert Health </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className='me-3 fw-semibold text-dark text-decoration-none' to="/">Accounts List</NavLink>
              <NavLink className='me-3 fw-semibold text-dark text-decoration-none' to="/import">Import Accounts</NavLink>
              <NavLink className='me-3 fw-semibold text-dark text-decoration-none' to="/transfer">Transfer Funds</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
    )
}