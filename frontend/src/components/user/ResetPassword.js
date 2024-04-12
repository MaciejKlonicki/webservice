import { useState } from 'react'
import { Button, Card, Spinner, Modal } from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import { withTranslation } from 'react-i18next'
import { Alert } from 'react-bootstrap'

const ResetPassword = ({ t }) => {

    const [state, setState] = useState({
        success: '',
        errors: '',
        error: '',
        loading: false
    })

    const history = useHistory()
    const [email, setEmail] = useState('')
    const [redirecting, setRedirecting] = useState(false)

    const handleResetPassword = (event) => {
        event.preventDefault()

        const data = { email: email }

        fetch('http://localhost:8080/api/v1/auth/password-reset-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                setState({ success: "Check your email address to reset the password", loading: false })
            } else if (response.status === 404) {
                setState({ error: "Email does not exist!", loading: false })
                setTimeout(() => {
                    refreshPage()
                }, 3000)
            } else {
                setState({ error: "Something went wrong!", loading: false })
            }
        }).catch(error => {
            setState({ errors: "Something went wrong!" })
        })

        setState({ loading: true })
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const routeChange = () => {
        let home = '/'
        history.push(home)
        window.location.reload(true)
    }

    const refreshPage = () => {
        window.location.reload(false)
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
                    <form className='Auth-form' style={{ textAlign: "center" }}>
                        {state.errors && <Alert variant='danger'>{state.errors}</Alert>}
                        {state.success && !redirecting && <Alert variant='success'>{state.success}</Alert>}
                        {state.error && <Alert variant='danger'>{state.error}</Alert>}
                        <div className='Auth-form-content'>
                            <img style={{ marginTop: '20px' }} src='/images/lock.png' alt='place-logo' />
                            <h3 style={{ color: 'white', marginTop: '50px' }} className='Auth-form-title'>{t('ResetYourPassword.1')}</h3>
                            <div style={{ color: 'white', textAlign: 'center' }} className='form-group mt-3'>
                                <label>{t('EnterEmail.1')}</label>
                                <input
                                    name='email'
                                    type='email'
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="form-control mt-1"
                                    style={{ width: '320px', margin: '0 auto' }}
                                    placeholder={t('EnterEmail.1')} />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <Card.Footer style={{ textAlign: "center" }}>
                                    <Button onClick={routeChange} size="md" type="secondary" className="btn btn-secondary">
                                        {t('Back.1')}
                                    </Button>{' '}
                                    <Button onClick={handleResetPassword} size="md" type="button" className="btn btn-success">
                                        {t('Reset.1')}
                                    </Button>
                                </Card.Footer>
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

export default withTranslation()(ResetPassword)