import React, { Component } from 'react';
import { Card, Nav } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import './Settings.css';

class Settings extends Component {
  render() {
    return (
      <Card bg="dark" variant="dark" style={{ width: '250px', height: '93.7vh', borderRadius: "0px"}}>
      <Card.Body>
        <Card.Title style={{color: "white", textTransform: "uppercase", fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", fontWeight: "500", letterSpacing: "10px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,.25)"}}>general settings</Card.Title>
        <ListGroup>
        <Nav.Link style={{background: "transparent", color: "gray", borderRadius: "0px", textAlign: "center"}} href="/settings/language" className="list-group-item"><p style={{position: "relative", marginBottom: "2px", fontFamily:"Arial, Helvetica, sans-serif"}}>Language</p></Nav.Link>
        <Nav.Link style={{background: "transparent", color: "gray", borderRadius: "0px", textAlign: "center"}} href="/settings/about" className="list-group-item"><p style={{position: "relative", marginBottom: "2px", fontFamily:"Arial, Helvetica, sans-serif"}}>About</p></Nav.Link>
        </ListGroup>
      </Card.Body>
    </Card>
    )
  }
}

export default Settings;
