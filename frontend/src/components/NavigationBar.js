import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { BiLogIn } from 'react-icons/bi';
import { BsFillPersonPlusFill} from 'react-icons/bs';

class NavigationBar extends React.Component {

  logout = () => {
    localStorage.clear();
    this.setState({email : "", isAuthenticated: false});
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" style={{paddingRight : "550px"}}>
          <Container>
            <Navbar.Brand href='/'><img src = '/images/places.png' alt = 'place-logo' />{' '}Web Service</Navbar.Brand>
            <Nav className='me-auto' style={{gridGap : "20px"}}>
              <Nav.Link href='/'><FaHome />{' '}Home</Nav.Link>
              <Nav.Link href='/profile'><CgProfile />{' '}Profile</Nav.Link>
              <Nav.Link href='/setting'><FiSettings />{' '}Settings</Nav.Link>
              <Nav.Link href='/register' style={{position: 'absolute', right: 0, bottom: 10}}><BsFillPersonPlusFill />{' '}Register</Nav.Link>
              <Nav.Link href='/login' style={{position: 'absolute', right: 100, bottom: 10}}><BiLogIn />{' '}Login</Nav.Link>
              <Nav.Link>Logged in user: {localStorage.getItem("email")}</Nav.Link>
              <span></span>
              {localStorage.getItem("email") !== null ? <div><a href="/login" onClick={this.logout}>Logout</a></div> : null}
            </Nav>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar;
