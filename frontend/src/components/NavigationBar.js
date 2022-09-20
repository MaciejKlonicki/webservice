import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { BiLogIn } from 'react-icons/bi';
import { BsFillPersonPlusFill} from 'react-icons/bs';

class NavigationBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" style={{paddingRight : "550px"}}>
          <Container>
            <Navbar.Brand href='/'>Web Service</Navbar.Brand>
            <Nav className='me-auto'>
              <Nav.Link href='/'><FaHome />{' '}Home</Nav.Link>
              <Nav.Link href='/profile'><CgProfile />{' '}Profile</Nav.Link>
              <Nav.Link href='/setting'><FiSettings />{' '}Settings</Nav.Link>
              <Nav.Link href='/register' style={{position: 'absolute', right: 0}}><BsFillPersonPlusFill />{' '}Register</Nav.Link>
              <Nav.Link href='/login' style={{position: 'absolute', right: 100}}><BiLogIn />{' '}Login</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar;
