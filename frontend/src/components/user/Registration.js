import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaUndo, FaSignInAlt } from 'react-icons/fa';
import RegistrationAlert from './RegistrationAlert';
import { withTranslation } from 'react-i18next';
import i18n from '../../i18next';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.registrationAlert = React.createRef();
    }

    refreshPage() {
        window.location.reload(false);
    }

    handleClick = (lang) => {
        i18n.changeLanguage(lang);
      }

    handleSubmit = event => {
        event.preventDefault();
        this.registerUser(event.target.username.value, event.target.email.value, event.target.password.value, event.target.mobile.value);
    };

    showRegistrationAlert(variant, heading, message) {
        this.registrationAlert.current.setVariant(variant);
        this.registrationAlert.current.setHeading(heading);
        this.registrationAlert.current.setMessage(message);
        this.registrationAlert.current.setVisible(true);
    }

    registerUser(username, email, password, mobile) {
        fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                mobile: mobile,
            })
        }).then(function(response) {
            if(response.status === 200) {
                this.showRegistrationAlert("success", "Registered!", "You will be redirected to the login page in a moment.");
                setTimeout(() => {
                    this.props.history.push('/login')
                    this.refreshPage();
                },4000)
            } else {
                this.showRegistrationAlert("danger", "User exist!", "Change your email.");
            }
        }.bind(this)).catch(function(error) {
            this.showRegistrationAlert("danger", "Error", "Something went wrong")
        }.bind(this));
    }

  render() {
    const { t } = this.props;

    return (
        <>
        <div className='Auth-form-container'>
            <form className='Auth-form' onSubmit={this.handleSubmit} style={{textAlign : "center"}}>
                <div className='Auth-form-content'>
                    <h2 className='Auth-form-title'>{t('RegisterTitle.1')}</h2>
                    <div className="form-group mt-3">
                        <label>{t('RegisterName.1')}</label>
                        <input
                            name='username'
                            type="text"
                            className="form-control mt-1"
                            placeholder={t('EnterNameRegister.1')} />
                </div>
                    <div className='form-group mt-3'>
                        <label>{t('RegisterEmail.1')}</label>
                        <input
                            name='email'
                            type="email"
                            className="form-control mt-1"
                            placeholder={t('EnterEmailRegister.1')} />
                    </div>
                    <div className="form-group mt-3">
                        <label>{t('RegisterPassword.1')}</label>
                        <input
                            name='password'
                            type="password"
                            className="form-control mt-1"
                            placeholder={t('EnterPasswordRegister.1')} />
                </div>
                <div className="form-group mt-3">
                        <label>{t('RegisterPhone.1')}</label>
                        <input
                            name='mobile'
                            type="text"
                            className="form-control mt-1"
                            placeholder={t('EnterPhoneRegister.1')} />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <Card.Footer style={{"textAlign":"left"}}>
                    <Button size="md" type="success" className="btn btn-success" style={{width : "32%"}}>
                        <FaSignInAlt />{' '}{t('RegisterFinal.1')}
                    </Button>{' '}
                    <Button size="md" type="info" className="btn btn-info" style={{width : "32%"}}
                        onClick = {this.refreshPage}>
                        <FaUndo />{' '}Reset
                    </Button>
                    </Card.Footer>
                    <br></br>
                    <p style={{"paddingLeft": "2%", "color" : "rgb(255, 255, 255)"}}>{t('RegisterExist.1')}{' '}<a href="/login">{t('RegisterLogin.1')}</a></p>
                </div>
                </div>
            </form>
        </div>
        <RegistrationAlert ref={this.registrationAlert}/>
        </>
    )
  }
}

export default withTranslation()(Registration);
