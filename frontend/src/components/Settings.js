import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

export default class Settings extends Component {
  render() {
    return (
      <Card bg="dark" variant="dark" style={{ width: '250px', height: '93.7vh', borderRadius: "0px"}}>
      <Card.Body>
        <Card.Title style={{color: "white", textTransform: "uppercase", fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", fontWeight: "500", letterSpacing: "10px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,.25)"}}>general settings</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    )
  }
}
