import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
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
                    <Button size="md" type="success" className="btn btn-success" style={{width : "30%"}}>
                        <FaSignInAlt />{' '}Login
                    </Button>{' '}
                    <Button size="md" type="info" className="btn btn-info" style={{width : "30%"}} onClick={this.resetLoginForm}>
                        <FaUndo />{' '}Reset
                    </Button>
                    </Card.Footer>
                    <br></br>
                    <p style={{"padding-left": "2%", "color" : "rgb(255, 255, 255)"}}>You don't have account? <a href="/register">Create an account</a></p>
                </div>
                </div>
            </form>
        </div>
    )
  }
}

export default Login;
