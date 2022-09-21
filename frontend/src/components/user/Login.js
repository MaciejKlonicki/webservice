import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaUndo, FaSignInAlt } from 'react-icons/fa';
import RegistrationAlert from './RegistrationAlert';

class Login extends Component {

    constructor(props) {
        super(props);
        this.registrationAlert = React.createRef();
    }

    refreshPage() {
        window.location.reload(false);
    }

    handleSubmit = event => {
        event.preventDefault();
        this.loginUser(event.target.email.value, event.target.password.value);
    };

    showRegistrationAlert(variant, heading, message) {
        this.registrationAlert.current.setVariant(variant);
        this.registrationAlert.current.setHeading(heading);
        this.registrationAlert.current.setMessage(message);
        this.registrationAlert.current.setVisible(true);
    }

    loginUser(email, password) {
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }).then(function (response){
            if (response.status === 200) {
                this.showRegistrationAlert("success", "Zalogowano się", "Za chwilę zostaniesz przeniesiony na stronę główną");
                setTimeout(() => {
                    this.props.history.push('/')
                    this.refreshPage();
                },4000)
            } else {
                this.showRegistrationAlert("danger", "Złe dane logowania", "Zły login lub hasło");
            }
        }.bind(this)).catch(function (error) {
            this.showRegistrationAlert("danger", "Error", "Something went wrong.");
        }.bind(this));
    }

  render() {
    return (
        <>
        <div className='Auth-form-container'>
            <form className='Auth-form' style={{textAlign : "center"}} onSubmit={this.handleSubmit}>
                <div className='Auth-form-content'>
                    <h3 className='Auth-form-title'>Login</h3>
                    <div className='form-group mt-3'>
                        <label>Email Address</label>
                        <input
                            name='email'
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            name='password'
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password" />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <Card.Footer style={{"textAlign":"left"}}>
                    <Button size="md" type="success" className="btn btn-success" style={{width : "30%"}}>
                        <FaSignInAlt />{' '}Login
                    </Button>{' '}
                    <Button size="md" type="info" className="btn btn-info" style={{width : "30%"}} onClick={this.refreshPage}>
                        <FaUndo />{' '}Reset
                    </Button>
                    </Card.Footer>
                    <br></br>
                    <p style={{"paddingLeft": "2%", "color" : "rgb(255, 255, 255)"}}>You don't have account? <a href="/register">Create an account</a></p>
                </div>
                </div>
            </form>
        </div>
        <RegistrationAlert ref={this.registrationAlert} />
        </>
    )
  }
}

export default Login;
