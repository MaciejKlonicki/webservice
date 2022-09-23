import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import './Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: '',
    }
    this.handel = this.handel.bind(this);
  }

  handel = (element) => {
    element = <Card bg="transparent" variant="dark" style={{position: 'relative', left: '335px',bottom: '335px', width: '500px', height: '500px', borderStyle: 'none'}}>
      <Card.Body style={{color: "rgb(156, 156, 156)"}}>
        <Card.Title style={{borderBottom: '0.5px solid rgba(255, 255, 255, 0.336)', paddingBottom: "10px", fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '1px'}}>Choose Language</Card.Title>
      </Card.Body>
    </Card>
    this.setState({
      change: element
    });
  }

  render() {
    return (
      <Card bg="dark" variant="dark" style={{ width: '250px', height: '93.7vh', borderRadius: "0px"}}>
      <Card.Body>
        <Card.Title style={{color: "white", textTransform: "uppercase", fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", fontWeight: "500", letterSpacing: "10px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,.25)"}}>general settings</Card.Title>
        <ListGroup>
        <button onClick={this.handel} style={{background: "transparent", color: "gray", borderRadius: "0px", textAlign: "center"}} className="list-group-item"><p style={{position: "relative", marginBottom: "2px", fontFamily:"Arial, Helvetica, sans-serif"}}>Language</p></button>
        <button style={{background: "transparent", color: "gray", borderRadius: "0px", textAlign: "center"}} className="list-group-item"><p style={{position: "relative", marginBottom: "2px", fontFamily:"Arial, Helvetica, sans-serif"}}>About</p></button>
        </ListGroup>
      </Card.Body>
      {this.state.change}
    </Card>
    )
  }
}

export default Settings;
