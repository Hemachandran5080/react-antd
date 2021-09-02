import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";

function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand href="#home"><strong>Charts</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link href="mailto:recruitments@trademarkia.com" style={{color:"white", paddingRight:300}}><strong>Contact Us</strong></Nav.Link>
                        <Nav.Link eventKey={2} href="#memes" style={{color:"white"}}>
                            Welcome,<strong>Hemachandran</strong>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header