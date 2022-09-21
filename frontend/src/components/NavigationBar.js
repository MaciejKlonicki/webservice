import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { BsFillPersonPlusFill} from 'react-icons/bs';

class NavigationBar extends React.Component {

  logout = () => {
    localStorage.removeItem(this.userLinks);
  }

  render() {

    const guestLinks = (
      <>
        <Nav.Link href='/register' style={{position: 'absolute', right: 0, bottom: 10}}><BsFillPersonPlusFill />{' '}Register</Nav.Link>
        <Nav.Link href='/login' style={{position: 'absolute', right: 100, bottom: 10}}><BiLogIn />{' '}Login</Nav.Link>
      </>
    );

    const userLinks = (
      <>
        <Nav.Link href='/'><FaHome />{' '}Home</Nav.Link>
        <Nav.Link href='/profile'><CgProfile />{' '}Profile</Nav.Link>
        <Nav.Link href='/setting'><FiSettings />{' '}Settings</Nav.Link>
        <Nav.Link href='/login' onClick={this.logout} style={{position: "relative", left : "1290px"}}><BiLogOut />{' '}Logout</Nav.Link>
      </>
    )

    return (
      <div>
        <Navbar bg="dark" variant="dark" style={{paddingRight : "550px"}}>
          <Container>
            <Navbar.Brand href='/'><img src = '/images/places.png' alt = 'place-logo' />{' '}Web Service</Navbar.Brand>
            <Nav className='me-auto' style={{gridGap : "20px"}}>
              {this.loginUser ? guestLinks : userLinks}
            </Nav>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar;
