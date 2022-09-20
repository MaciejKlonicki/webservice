import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap';

class NavigationBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" style={{paddingRight : "550px"}}>
          <Container>
            <Navbar.Brand href='/'>Web Service</Navbar.Brand>
            <Nav className='me-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/profile'>Profile</Nav.Link>
              <Nav.Link href='/setting'>Settings</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar;
