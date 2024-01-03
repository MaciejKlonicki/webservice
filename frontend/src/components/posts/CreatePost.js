import React, { Component } from 'react'
import { Alert, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { withTranslation } from 'react-i18next'
import { FiInfo } from "react-icons/fi";

class CreatePost extends Component {

    constructor(props) {
        super(props)
        this.createPostAlert = React.createRef()
        this.state = this.initialState
    }

    initialState = {
        success: '', errors: '', error: ''
    }

    refreshPage() {
        window.location.reload(false)
    }

    routeChange = () => {
        let postDetails = '/'
        this.props.history.push(postDetails)
        window.location.reload(true)
    }

    handleSubmit = event => {
        event.preventDefault()

        const formData = new FormData()
        const title = event.target.title.value
        const body = event.target.body.value
        const author = localStorage.getItem("email")
        const type = event.target.type.value
        const photo = event.target.photo.files[0]

        if (!title || !body || !author || !type || !photo) {
            this.setState({ "errors": "Please fill in all the fields." })
            return
        }

        if (photo.size > 1024 * 1024) {
            this.setState({ "errors": "The photo size exceeds the limit of 1MB." })
            return
        }

        formData.append('title', event.target.title.value)
        formData.append('body', event.target.body.value)
        formData.append('author', author)
        formData.append('type', event.target.type.value)
        formData.append('creationDate', new Date().toISOString())
        formData.append('photo', event.target.photo.files[0])

        this.addPost(formData)
    }

    addPost(formData) {
        fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.status === 200) {
                this.setState({ "success": "You created post successfully!" })

                setTimeout(() => {
                    this.props.history.push('/')
                    this.refreshPage()
                }, 1000)
            } else {
                this.setState({ "error": "This article title already exists!" })
            }
        }).catch(error => {
            this.setState({ "errors": "Something went wrong!" })
        })
    }

    render() {

        const { t } = this.props

        const titleTooltip = (
            <Tooltip id="title-tooltip">
                Max length is 100 characters.
            </Tooltip>
        )

        return (
            <div style={{ maxWidth: "1300px", margin: "0 auto", textAlign: "center" }}>
                <h2 style={{ color: "white", marginTop: "10px", marginBottom: "10px" }}>{t('AddNewPost.1')}</h2>
                <form onSubmit={this.handleSubmit}>
                    {this.state.errors && <Alert variant='danger'>{this.state.errors}</Alert>}
                    {this.state.error && <Alert variant='danger'>{this.state.error}</Alert>}
                    {this.state.success && <Alert variant='success'>{this.state.success}</Alert>}
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
                    <button onClick={this.routeChange} className="btn btn-secondary" style={{ border: "0", borderRadius: "8px", cursor: "pointer", marginTop: "5px", marginBottom: '10px', marginRight: '10px' }}>{t('Cancel.1')}</button>
                    <button className="btn btn-primary" style={{ border: "0", borderRadius: "8px", cursor: "pointer", marginTop: "5px", marginBottom: '10px' }}>{t('AddPostButton.1')}</button>
                </form>
            </div>
        )
    }
}

export default withTranslation()(CreatePost)