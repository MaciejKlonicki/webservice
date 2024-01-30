import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { FaUndo, FaSignInAlt } from 'react-icons/fa'
import { withTranslation } from 'react-i18next'
import { jwtDecode } from "jwt-decode"

const Login = ({ t, history }) => {

    const [state, setState] = useState({
        error: '',
        success: '',
        errors: ''
    })

    const refreshPage = () => {
        window.location.reload(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        loginUser(event.target.username.value, event.target.password.value)
    }

    const loginUser = (username, password) => {
        fetch('http://localhost:8080/api/v1/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(async function (response) {
            if (response.ok) {
                const responseData = await response.json()

                const accessToken = responseData.access_token
                const refreshToken = responseData.refresh_token

                const decoded = jwtDecode(accessToken)

                localStorage.setItem("access_token", accessToken)
                localStorage.setItem("refresh_token", refreshToken)
                localStorage.setItem("user_id", decoded.userId)
                localStorage.setItem("username", decoded.sub)
                localStorage.setItem("role", decoded.role)
                localStorage.setItem("email", decoded.email)

                setState({ "success": "You are logged in!" })
                setTimeout(() => {
                    history.push('/')
                    refreshPage()
                }, 1000)
            } else {
                setState({ "error": "Check your credentials and verify your email address!" })
                setTimeout(() => {
                    refreshPage()
                }, 3000)
            }
        }).catch(function (error) {
            setState({ "errors": "Something went wrong!" })
        })
    }

    return (
        <div className='Auth-form-container'>
            <form className='Auth-form' style={{ textAlign: "center" }} onSubmit={handleSubmit}>
                {state.error && <Alert variant='danger'>{state.error}</Alert>}
                {state.errors && <Alert variant='danger'>{state.errors}</Alert>}
                {state.success && <Alert variant='success'>{state.success}</Alert>}
                <div className='Auth-form-content'>
                    <h3 style={{ color: 'white', marginTop: '50px' }} className='Auth-form-title'>{t('Login.1')}</h3>
                    <div style={{ color: 'white', textAlign: 'center' }} className='form-group mt-3'>
                        <label>{t('RegisterLogin.1')}</label>
                        <input
                            name='username'
                            type="text"
                            className="form-control mt-1"
                            style={{ width: '320px', margin: '0 auto' }}
                            placeholder={t('EnterNameRegister.1')} />
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
                            <Button onClick={refreshPage} size="sm" type="info" className="btn btn-info">
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

export default withTranslation()(Login)
