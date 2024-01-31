import React, { useState } from 'react'
import { Alert, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import { withTranslation } from 'react-i18next'
import { FiInfo } from "react-icons/fi"

const CreatePost = ({ t }) => {

    const history = useHistory()

    const [state, setState] = useState({
        success: '',
        errors: '',
        error: ''
    })

    const refreshPage = () => {
        window.location.reload(false)
    }

    const routeChange = () => {
        let home = '/'
        history.push(home)
        window.location.reload(true)
    }

    const handleSubmit = event => {
        event.preventDefault()

        const formData = new FormData()
        const title = event.target.title.value
        const body = event.target.body.value
        const author = localStorage.getItem("username")
        const type = event.target.type.value
        const photo = event.target.photo.files[0]

        if (!title || !body || !author || !type || !photo) {
            setState({ errors: "Please fill in all the fields." })
            return
        }

        if (photo.size > 1024 * 1024) {
            setState({ errors: "The photo size exceeds the limit of 1MB." })
            return
        }

        formData.append('title', title)
        formData.append('body', body)
        formData.append('author', author)
        formData.append('type', type)
        formData.append('creationDate', new Date().toISOString())
        formData.append('photo', photo)

        addPost(formData)
    }

    const addPost = formData => {
        fetch('http://localhost:8080/api/v1/posts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: formData,
        }).then(response => {
            if (response.status === 200) {
                setState({ success: "You created post successfully!" })

                setTimeout(() => {
                    history.push('/')
                    refreshPage()
                }, 1000)
            } else {
                setState({ error: "This article title already exists!" })
            }
        }).catch(error => {
            setState({ errors: "Something went wrong!" })
        })
    }

    const titleTooltip = (
        <Tooltip id="title-tooltip">
            {t('TitleMaxLength.1')}
        </Tooltip>
    )

    return (
        <div style={{ maxWidth: "1300px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ color: "white", marginTop: "10px", marginBottom: "10px" }}>{t('AddNewPost.1')}</h2>
            <form onSubmit={handleSubmit}>
                {state.errors && <Alert variant='danger'>{state.errors}</Alert>}
                {state.error && <Alert variant='danger'>{state.error}</Alert>}
                {state.success && <Alert variant='success'>{state.success}</Alert>}
                <label style={{ textAlign: "left", display: "block", color: "white" }}>{t('BlogTitle.1')}
                    <OverlayTrigger placement="top" overlay={titleTooltip}>
                        <span style={{ marginLeft: '5px', cursor: 'pointer' }}><FiInfo style={{ marginBottom: '2px' }} /></span>
                    </OverlayTrigger>
                </label>
                <input
                    style={{ width: "100%", padding: "6px 10px", margin: "10px 0", border: "1px solid #ddd", boxSizing: "border-box", display: "block", borderRadius: "5px" }}
                    name="title"
                    type="text"
                    required
                    maxLength={100}
                />
                <label style={{ textAlign: "left", display: "block", color: "white" }}>{t('BlogBody.1')}</label>
                <textarea
                    style={{ width: "100%", height: "180px", padding: "6px 10px", margin: "10px 0", border: "1px solid #ddd", boxSizing: "border-box", display: "block", borderRadius: "5px" }}
                    required
                    name="body"
                />
                <label style={{ textAlign: "left", display: "block", color: "white" }}>{t('BlogAuthor.1')}</label>
                <div
                    style={{
                        width: "100%",
                        padding: "6px 10px",
                        margin: "10px 0",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        backgroundColor: "#f8f9fa",
                        textAlign: 'left'
                    }}
                >
                    {localStorage.getItem("email")}
                </div>
                <label style={{ textAlign: "left", display: "block", color: "white", marginBottom: "10px" }}>{t('BlogType.1')}</label>
                <select name='type' style={{ padding: "6px 10px", margin: "10px 0", border: "1px solid #ddd", boxSizing: "border-box", display: "block", borderRadius: "5px", width: "100%" }}>
                    <option value="SPORT">{t('Sport.1')}</option>
                    <option value="EDUCATION">{t('Education.1')}</option>
                    <option value="MUSIC">{t('Music.1')}</option>
                    <option value="OTHER">{t('Other.1')}</option>
                </select>
                <label style={{ textAlign: "left", display: "block", color: "white", width: '100%' }}>{t('BlogPhoto.1')}</label>
                <input
                    style={{ padding: "6px 10px", margin: "10px 0", border: "1px solid #ddd", boxSizing: "border-box", display: "block", borderRadius: "5px", width: "100%", color: 'white' }}
                    type="file"
                    accept="image/*"
                    name="photo"
                />
                <button onClick={routeChange} className="btn btn-secondary" style={{ border: "0", borderRadius: "8px", cursor: "pointer", marginTop: "5px", marginBottom: '10px', marginRight: '10px' }}>{t('Cancel.1')}</button>
                <button className="btn btn-primary" style={{ border: "0", borderRadius: "8px", cursor: "pointer", marginTop: "5px", marginBottom: '10px' }}>{t('AddPostButton.1')}</button>
            </form>
        </div>
    )
}

export default withTranslation()(CreatePost)