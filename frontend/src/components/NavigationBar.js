import React from 'react'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { FiSettings } from 'react-icons/fi';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { BsFillPersonPlusFill} from 'react-icons/bs';
import { withTranslation } from 'react-i18next';
import i18n from '../i18next';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
            users: []
    }
}

  logout = () => {
    localStorage.clear();
    this.setState({email : "", isAuthenticated: false});
  }

  handleClick = (lang) => {
    i18n.changeLanguage(lang);
  }

  render() {
    const { t } = this.props;
    const guestLinks = (
      <>
      <Nav.Link href='/register' style={{position: 'absolute', right: 0, bottom: 10}}><BsFillPersonPlusFill style={{position : "relative", bottom: "2px"}}/>{' '}{t('Register.1')}</Nav.Link>
      <Nav.Link href='/login' style={{position: 'absolute', right: 110, bottom: 10}}><BiLogIn style={{position : "relative", bottom: "2px"}}/>{' '}{t('Login.1')}</Nav.Link>
      </>
      );

    const userLinks = (
      <>
      <Nav.Link style={{ marginLeft: "600px", width: "500px" }}>{t('Logged.1')}<b style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>{localStorage.getItem("email")}</b></Nav.Link>
      <Navbar.Toggle aria-controls="navbar-dark-example" /><Navbar.Collapse id='navbar-dark-example'>
        <Nav>
          <NavDropdown
            id='nav-dropdown-dark-example'
            title={t('Menu.1')}
            menuVariant='dark'
            style={{ marginLeft: "500px" }}
            drop='start'
          >
            <NavDropdown.Item href='#action/3.1'>
              <Nav.Link style={{ position: "static", left: "1400px" }} href='/settings'><FiSettings style={{ position: "relative", bottom: "1px" }} />{' '}{t('Settings.1')}</Nav.Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='#action/3.2'>
            {localStorage.getItem("email") !== null ? <div><Nav.Link href="/login" onClick={this.logout}><BiLogOut style={{ position: "relative", bottom: "1px" }} />{' '}{t('Logout.1')}</Nav.Link></div> : null}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
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
export default withTranslation()(NavigationBar);