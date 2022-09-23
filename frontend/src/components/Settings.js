import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import './Settings.css';

export default class Settings extends Component {
  render() {
    return (
      <Card bg="dark" variant="dark" style={{ width: '250px', height: '93.7vh', borderRadius: "0px"}}>
      <Card.Body>
        <Card.Title style={{color: "white", textTransform: "uppercase", fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", fontWeight: "500", letterSpacing: "10px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,.25)"}}>general settings</Card.Title>
        <ListGroup>
        <a style={{background: "transparent", color: "gray", borderRadius: "0px"}} href="/settings/language" class="list-group-item"><p style={{position: "relative", marginBottom: "2px", fontFamily:"Arial, Helvetica, sans-serif"}}>Language</p></a>
        <a style={{background: "transparent", color: "gray", borderRadius: "0px"}} href="/settings/about" class="list-group-item"><p style={{position: "relative", marginBottom: "2px", fontFamily:"Arial, Helvetica, sans-serif"}}>About</p></a>
        </ListGroup>
      </Card.Body>
    </Card>
    )
  }
}
