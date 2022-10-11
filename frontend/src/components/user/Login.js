import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaUndo, FaSignInAlt } from 'react-icons/fa';
import RegistrationAlert from './RegistrationAlert';
import { withTranslation } from 'react-i18next';
import i18n from '../../i18next';

class Login extends Component {

    constructor(props) {
        super(props);
        this.registrationAlert = React.createRef();
    }

    handleClick = (lang) => {
        i18n.changeLanguage(lang);
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
        fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }).then(function(response){
            if (response.status === 200) {
                this.showRegistrationAlert("success", "Logged in successfuly");
                localStorage.setItem("email", email);
                this.props.updateEmail();
            } else {
                this.showRegistrationAlert("danger", "Bad credentials", "Wrong login or password");
            }
        }.bind(this)).catch(function (error) {
            this.showRegistrationAlert("danger", "Error", "Something went wrong.");
        }.bind(this));
    }

  render() {
    const { t } = this.props;

    return (
        <>
        <div className='Auth-form-container'>
            <form className='Auth-form' style={{textAlign : "center"}} onSubmit={this.handleSubmit}>
                <div className='Auth-form-content'>
                    <h3 className='Auth-form-title'>Login</h3>
                    <div className='form-group mt-3'>
                        <label>{t('Email.1')}</label>
                        <input
                            name='email'
                            type="email"
                            className="form-control mt-1"
                            placeholder={t('EnterEmail.1')} />
                    </div>
                    <div className="form-group mt-3">
                        <label>{t('Password.1')}</label>
                        <input
                            name='password'
                            type="password"
                            className="form-control mt-1"
                            placeholder={t('EnterPassword.1')} />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <Card.Footer style={{"textAlign":"left"}}>
                    <Button size="md" type="success" className="btn btn-success" style={{width : "32%"}}>
                        <FaSignInAlt />{' '}Login
                    </Button>{' '}
                    <Button size="md" type="info" className="btn btn-info" style={{width : "32%"}} onClick={this.refreshPage}>
                        <FaUndo />{' '}Reset
                    </Button>
                    </Card.Footer>
                    <br></br>
                    <p style={{"paddingLeft": "2%", "color" : "rgb(255, 255, 255)"}}>{t('NoAccount.1')}{' '}<a href="/register">{t('CreateAccount.1')}</a></p>
                </div>
                </div>
            </form>
        </div>
        <RegistrationAlert ref={this.registrationAlert} />
        </>
    )
  }
}

export default withTranslation()(Login);
