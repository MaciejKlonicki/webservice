import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap';
import { BiLogIn } from 'react-icons/bi';
import { BsFillPersonPlusFill} from 'react-icons/bs';
import MoveDownAccount from './SlideMenu/MoveDownAccount';

class NavigationBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      account: false
    }
  }

  logout = () => {
    localStorage.clear();
    this.setState({email : "", isAuthenticated: false});
  }

  render() {

    const onMouseEnterAccount = () => {
      if (window.innerWidth < 540) {
        this.setState({account: false})
      } else {
        this.setState({account: true})
      }
    };

    const onMouseLeaveAccount = () => {
      if (window.innerWidth < 540) {
        this.setState({account: false})
      } else {
        this.setState({account: false})
      }
    };

    const guestLinks = (
      <>
      <Nav.Link href='/register' style={{position: 'absolute', right: 0, bottom: 10}}><BsFillPersonPlusFill style={{position : "relative", bottom: "2px"}}/>{' '}Register</Nav.Link>
      <Nav.Link href='/login' style={{position: 'absolute', right: 100, bottom: 10}}><BiLogIn style={{position : "relative", bottom: "2px"}}/>{' '}Login</Nav.Link>
      </>
      );

    const userLinks = (
      <>
      <li
      onMouseEnter={onMouseEnterAccount}
      onMouseLeave={onMouseLeaveAccount}>
      <Nav.Link style={{position:"relative", left:"1320px"}}>Logged as: <b>{localStorage.getItem("email")}</b></Nav.Link>
      {this.state.account && <MoveDownAccount />}
      </li>
      {localStorage.getItem("email") !== null ? <Nav.Link style={{position: "relative", left:"1290px", fontFamily: "Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}} href="/login" onClick={this.logout}>(Logout)</Nav.Link> : null}
      </>
    );

    return (
      <div>
        <Navbar bg="dark" variant="dark" style={{paddingRight : "550px"}}>
          <Container>
            <Navbar.Brand href='/'><img src = '/images/places.png' alt = 'place-logo' />{' '}Web Service</Navbar.Brand>
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
