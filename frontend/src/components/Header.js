import React from 'react'
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

// React-router-bootstrap
import { LinkContainer } from 'react-router-bootstrap';

// cdnjs.com找font-awesome

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Mashop</Navbar.Brand>
  
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

            <LinkContainer to='/cart'>
              <Nav.Link><i className="fa-solid fa-cart-shopping"></i>購物車</Nav.Link>
            </LinkContainer>

            <Nav.Link href="/login">
              <i className="fa-solid fa-right-to-bracket"></i>登入
            </Nav.Link>

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">

              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header