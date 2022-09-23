import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap';
import { FiSettings } from 'react-icons/fi';
import {CgProfile } from 'react-icons/cg'
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { BsFillPersonPlusFill} from 'react-icons/bs';

class NavigationBar extends React.Component {

  logout = () => {
    localStorage.clear();
    this.setState({email : "", isAuthenticated: false});
  }

  render() {

    const guestLinks = (
      <>
      <Nav.Link href='/register' style={{position: 'absolute', right: 0, bottom: 10}}><BsFillPersonPlusFill style={{position : "relative", bottom: "2px"}}/>{' '}Register</Nav.Link>
      <Nav.Link href='/login' style={{position: 'absolute', right: 100, bottom: 10}}><BiLogIn style={{position : "relative", bottom: "2px"}}/>{' '}Login</Nav.Link>
      </>
      );

    const userLinks = (
      <>
      <Nav.Link style={{position : "relative", left: "1400px"}} href='/profile'><CgProfile style={{position : "relative", bottom: "1px"}}/>{' '}Profile</Nav.Link>
      <Nav.Link style={{position : "relative", left: "1400px"}} href='/settings'><FiSettings style={{position : "relative", bottom: "1px"}}/>{' '}Settings</Nav.Link>
      <Nav.Link style={{position:"relative", left:"400px"}}>Logged as: <b>{localStorage.getItem("email")}</b></Nav.Link>
      <span></span>
      {localStorage.getItem("email") !== null ? <div><Nav.Link style={{position: "relative", left:"1140px"}} href="/login" onClick={this.logout}><BiLogOut style={{position : "relative", bottom: "1px"}}/>{' '}Logout</Nav.Link></div> : null}
      </>
    );

    return (
      <div>
        <Navbar bg="dark" variant="dark" style={{paddingRight : "550px"}}>
          <Container>
            <Navbar.Brand style={{color: "gray"}} href='/'><img src = '/images/places.png' alt = 'place-logo' />{' '}Web Service</Navbar.Brand>
            <Nav className='me-auto' style={{gridGap : "20px"}}>
              {localStorage.getItem("email") === null ? guestLinks : userLinks}
            </Nav>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar;
