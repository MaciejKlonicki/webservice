import React, { Component } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { FaUndo, FaSignInAlt } from 'react-icons/fa'
import { withTranslation } from 'react-i18next'
import i18n from '../../i18next'

class Login extends Component {
    constructor(props) {
        super(props)
        this.registrationAlert = React.createRef()
        this.state = this.initialState
    }

    initialState = {
        error: '', success: '', errors: ''
    }

    handleClick = (lang) => {
        i18n.changeLanguage(lang)
    }

    refreshPage() {
        window.location.reload(false)
    }

    handleSubmit = event => {
        event.preventDefault()
        this.loginUser(event.target.email.value, event.target.password.value)
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
        }).then(function (response) {
            if (response.status === 200) {
                this.setState({ "success": "You are logged in!" })
                
                setTimeout(() => {
                    localStorage.setItem("email", email)
                    this.props.updateEmail()
                    this.props.history.push('/')
                    this.refreshPage()
                }, 1000)
            } else {
                this.setState({ "error": "Invalid credentials" })
                setTimeout(() => {
                    this.refreshPage()
                }, 1000)
            }
        }.bind(this)).catch(function (error) {
            this.setState({ "errors": "Something went wrong!" })
        }.bind(this))
    }

    render() {  
        const { t } = this.props

        return (
                <div className='Auth-form-container'>
                    <form className='Auth-form' style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
                        {this.state.error && <Alert variant='danger'>{this.state.error}</Alert>}
                        {this.state.errors && <Alert variant='danger'>{this.state.errors}</Alert>}
                        {this.state.success && <Alert variant='success'>{this.state.success}</Alert>}
                        <div className='Auth-form-content'>
                            <h3 style={{ color: 'white', marginTop: '50px' }} className='Auth-form-title'>{t('Login.1')}</h3>
                            <div style={{ color: 'white', textAlign: 'center' }} className='form-group mt-3'>
                                <label>{t('Email.1')}</label>
                                <input
                                    name='email'
                                    type="email"
                                    className="form-control mt-1"
                                    style={{ width: '320px', margin: '0 auto' }}
                                    placeholder={t('EnterEmail.1')} />
                                <label>{t('Password.1')}</label>
                                <input
                                    name='password'
                                    type="password"
                                    className="form-control mt-1"
                                    style={{ width: '320px', margin: '0 auto' }}
                                    placeholder={t('EnterPassword.1')} />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <Card.Footer style={{ textAlign: "center" }}>
                                    <Button size="sm" type="success" className="btn btn-success">
                                        <FaSignInAlt />{' '}{t('Login.1')}
                                    </Button>{' '}
                                    <Button onClick={this.refreshPage} size="sm" type="info" className="btn btn-info">
                                        <FaUndo />{' '}{t('Reset.1')}
                                    </Button>
                                </Card.Footer>
                                <br></br>
                                <p style={{ "color": "rgb(255, 255, 255)" }}>{t('NoAccount.1')}{' '}<a href="/register">{t('CreateAccount.1')}</a></p>
                            </div>
                        </div>
                    </form>
                </div>
        )
    }
}

export default withTranslation()(Login)
