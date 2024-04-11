import React, { useState } from 'react'
import { Alert, Button, Card, Spinner, Modal } from 'react-bootstrap'
import { FaUndo, FaSignInAlt } from 'react-icons/fa'
import { withTranslation } from 'react-i18next'

const Registration = ({ t, history }) => {

    const [state, setState] = useState({
        success: '',
        errors: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        passwordRequirements: '',
        passwordMatchError: '',
        loading: false
    })

    const [redirecting, setRedirecting] = useState(false)

    const refreshPage = () => {
        window.location.reload(false)
    }

    const handleMobileChange = (event) => {
        const inputValue = event.target.value
        if (/^[0-9]*$/.test(inputValue) && inputValue.length <= 9) {
            setState((prevState) => ({ ...prevState, mobile: inputValue }))
        }
    }

    const handlePasswordChange = (event) => {
        const inputValue = event.target.value

        const hasUppercase = /[A-Z]/.test(inputValue)
        const hasNumber = /\d/.test(inputValue)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(inputValue)
        const hasAtLeast6Characters = inputValue.length >= 6

        setState((prevState) => ({
            ...prevState,
            password: inputValue,
            passwordRequirements: (
                (!hasUppercase ? 'One uppercase letter, ' : '') +
                (!hasNumber ? 'One digit, ' : '') +
                (!hasSpecialChar ? 'One special character, ' : '') +
                (!hasAtLeast6Characters ? 'At least 6 characters' : '')
            ).trim(),
        }))
    }

    const handleConfirmPasswordChange = (event) => {
        const inputValue = event.target.value
        setState((prevState) => ({ ...prevState, confirmPassword: inputValue }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { username, email, password, confirmPassword, mobile } = event.target

        if (password.value !== confirmPassword.value) {
            setState({
                passwordMatchError: 'Passwords do not match.',
                errors: '',
            })

            setTimeout(() => {
                setState({ passwordMatchError: '' })
            }, 3000)

            return
        }

        setState({ loading: true })

        registerUser(username.value, email.value, password.value, confirmPassword.value, mobile.value)
    }

    const registerUser = (username, email, password, confirmPassword, mobile) => {
        const hasUppercase = /[A-Z]/.test(password)
        const hasNumber = /\d/.test(password)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
        const hasAtLeast6Characters = password.length >= 6

        if (!(hasUppercase && hasNumber && hasSpecialChar && hasAtLeast6Characters)) {
            setState({
                errors: 'Password is too weak. Please meet the requirements.'
            })
            return
        }

        fetch('http://localhost:8080/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                mobile: mobile,
            })
        }).then(function (response) {
            if (response.status === 200) {
                setState({ success: 'You created an account successfully!' })
                setRedirecting(true)

            } else {
                setState({ errors: 'The username or email address is already taken! Please change your registration details' })
            }
        }).catch(function (error) {
            setState({ errors: 'Something went wrong!' })
        }).finally(() => {
            setState({ loading: false })
        })
    }

    return (
        <>
            {state.loading ? (
                <div style={{ textAlign: 'center', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1000' }}>
                    <Spinner animation="border" role="status" variant="light">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div className='Auth-form-container'>
                    <form className='Auth-form' onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                        {state.errors && <Alert variant='danger'>{state.errors}</Alert>}
                        {state.success && !redirecting && <Alert variant='success'>{state.success}</Alert>}
                        {state.passwordMatchError && <Alert variant='danger'>{state.passwordMatchError}</Alert>}
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
                                    value={state.password}
                                    onChange={handlePasswordChange} />
                                {state.passwordRequirements && (
                                    <p style={{ color: 'rgb(255, 255, 255)', fontSize: '12px' }}>
                                        {state.passwordRequirements}
                                    </p>
                                )}
                            </div>
                            <div className="form-group mt-3">
                                <label>{t('ConfirmPassword.1')}</label>
                                <input
                                    name='confirmPassword'
                                    required
                                    type="password"
                                    className="form-control mt-1"
                                    style={{ width: '320px', margin: '0 auto' }}
                                    placeholder={t('ConfirmPassword.1')}
                                    value={state.confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>{t('RegisterPhone.1')}</label>
                                <input
                                    name='mobile'
                                    type="text"
                                    className="form-control mt-1"
                                    style={{ width: '320px', margin: '0 auto' }}
                                    placeholder={t('EnterPhoneRegister.1')}
                                    value={state.mobile}
                                    onChange={handleMobileChange}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <Card.Footer style={{ textAlign: "center" }}>
                                    <Button size="sm" type="success" className="btn btn-success">
                                        <FaSignInAlt />{' '}{t('RegisterFinal.1')}
                                    </Button>{' '}
                                    <Button size="sm" type="info" className="btn btn-info"
                                        onClick={refreshPage}>
                                        <FaUndo />{' '}{t('Reset.1')}
                                    </Button>
                                </Card.Footer>
                                <br></br>
                                <p style={{ "paddingLeft": "1%", "color": "rgb(255, 255, 255)" }}>{t('RegisterExist.1')}{' '}<a href="/login">{t('RegisterLogin.1')}</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {redirecting && (
                <Modal show={redirecting} onHide={() => setRedirecting(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t('RegistrationSuccess.1')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{ color: 'green' }}>{t('RegistrationSuccessMessage.1')}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => {
                            history.push('/login')
                            refreshPage()
                        }}>
                            {t('GoToLogin.1')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}

export default withTranslation()(Registration)
