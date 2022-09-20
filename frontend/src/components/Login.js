import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  render() {
    return (
        <div className='Auth-form-container'>
            <form className='Auth-form'>
                <div className='Auth-form-content'>
                    <h3 className='Auth-form-title'>Sign In</h3>
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
                    <button type="success" className="btn btn-success" style={{width : "20%"}}>
                        Login
                    </button>
                </div>
                </div>
            </form>
        </div>
    )
  }
}

export default Login;
