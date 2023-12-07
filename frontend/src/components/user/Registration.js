import React, { Component } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { FaUndo, FaSignInAlt } from 'react-icons/fa'
import { withTranslation } from 'react-i18next'
import i18n from '../../i18next'

class Registration extends Component {
    constructor(props) {
        super(props)
        this.registrationAlert = React.createRef()
        this.state = this.initialState
    }

    initialState = {
        success: '', errors: '', password: '', mobile: '', passwordRequirements: ''
    }

    refreshPage() {
        window.location.reload(false)
    }

    handleClick = (lang) => {
        i18n.changeLanguage(lang)
    }

    handleMobileChange = event => {
        const inputValue = event.target.value;
        if (/^[0-9]*$/.test(inputValue) && inputValue.length <= 9) {
            this.setState({ mobile: inputValue });
        }
    }

    handlePasswordChange = event => {
        const inputValue = event.target.value;

        const hasUppercase = /[A-Z]/.test(inputValue);
        const hasNumber = /\d/.test(inputValue);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(inputValue);

        this.setState({
            password: inputValue,
            passwordRequirements: (
                (!hasUppercase ? 'One uppercase letter, ' : '') +
                (!hasNumber ? 'One digit, ' : '') +
                (!hasSpecialChar ? 'One special character' : '')
            ).trim(),
        });
    }

    handleSubmit = event => {
        event.preventDefault()
        this.registerUser(event.target.username.value, event.target.email.value, event.target.password.value, event.target.mobile.value)
    }

    registerUser(username, email, password, mobile) {
        fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                mobile: mobile,
            })
        }).then(function (response) {
            if (response.status === 200) {
                this.setState({ "success": "You created an account successfully!" })

                setTimeout(() => {
                    this.props.history.push('/login')
                    this.refreshPage()
                }, 1000)
            } else {
                this.setState({ "errors": "Something went wrong!" })
            }
        }.bind(this)).catch(function (error) {
            this.setState({ "errors": "Something went wrong!" })
        }.bind(this))
    }

    render() {
        const { t } = this.props

        return (
            <>
                <div className='Auth-form-container'>
                    <form className='Auth-form' onSubmit={this.handleSubmit} style={{ textAlign: "center" }}>
                        {this.state.errors && <Alert variant='danger'>{this.state.errors}</Alert>}
                        {this.state.success && <Alert variant='success'>{this.state.success}</Alert>}
                        <div style={{ color: 'white' }} className='Auth-form-content'>
                            <h2 style={{ marginTop: '50px' }} className='Auth-form-title'>{t('RegisterTitle.1')}</h2>
                            <div className="form-group mt-3">
                                <label>{t('RegisterName.1')}</label>
                                <input
                                    name='username'
                                    required
                                    type="text"
                                    className="form-control mt-1"
                                    style={{ width: '320px', margin: '0 auto' }}
                                    placeholder={t('EnterNameRegister.1')} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>{t('RegisterEmail.1')}</label>
                                <input
                                    name='email'
                                    required
                                    type="email"
                                    className="form-control mt-1"
                                    style={{ width: '320px', margin: '0 auto' }}
                                    placeholder={t('EnterEmailRegister.1')} />
                            </div>
                            <div className="form-group mt-3">
                                <label>{t('RegisterPassword.1')}</label>
                                <input
                                    name='password'
                                    required
                                    type="password"
                                    className="form-control mt-1"
                                    style={{ width: '320px', margin: '0 auto' }}
                                    placeholder={t('EnterPasswordRegister.1')}
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange} />
                                {this.state.passwordRequirements && (
                                    <p style={{ color: 'rgb(255, 255, 255)', fontSize: '12px' }}>
                                        {this.state.passwordRequirements}
                                    </p>
                                )}
                            </div>
                            <div className="form-group mt-3">
                                <label>{t('RegisterPhone.1')}</label>
                                <input
                                    name='mobile'
                                    type="text"
                                    className="form-control mt-1"
                                    style={{ width: '320px', margin: '0 auto' }}
                                    placeholder={t('EnterPhoneRegister.1')}
                                    value={this.state.mobile}
                                    onChange={this.handleMobileChange}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <Card.Footer style={{ textAlign: "center" }}>
                                    <Button size="sm" type="success" className="btn btn-success">
                                        <FaSignInAlt />{' '}{t('RegisterFinal.1')}
                                    </Button>{' '}
                                    <Button size="sm" type="info" className="btn btn-info"
                                        onClick={this.refreshPage}>
                                        <FaUndo />{' '}{t('Reset.1')}
                                    </Button>
                                </Card.Footer>
                                <br></br>
                                <p style={{ "paddingLeft": "2%", "color": "rgb(255, 255, 255)" }}>{t('RegisterExist.1')}{' '}<a href="/login">{t('RegisterLogin.1')}</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default withTranslation()(Registration)
