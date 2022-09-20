import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import './Login.css';
import { FaUndo, FaSignInAlt } from 'react-icons/fa';

class Login extends Component {

    resetLoginForm = () => {
        this.setState(() => this.initialState);
    };

  render() {
    return (
        <div className='Auth-form-container'>
            <form className='Auth-form'>
                <div className='Auth-form-content'>
                    <h3 className='Auth-form-title'>Login</h3>
                    <div className='form-group mt-3'>
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password" />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <Card.Footer style={{"textAlign":"left"}}>
                    <Button size="sm" type="success" className="btn btn-success" style={{width : "25%"}}>
                        <FaSignInAlt />{' '}Login
                    </Button>{' '}
                    <Button size="sm" type="info" className="btn btn-info" style={{width : "25%"}} onClick={this.resetLoginForm}>
                        <FaUndo />{' '}Reset
                    </Button>
                    </Card.Footer>
                </div>
                </div>
            </form>
        </div>
    )
  }
}

export default Login;
