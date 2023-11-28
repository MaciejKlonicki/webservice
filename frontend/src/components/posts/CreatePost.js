import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'
import { withTranslation } from 'react-i18next'


class CreatePost extends Component {

    constructor(props) {
        super(props)
        this.createPostAlert = React.createRef()
        this.state = this.initialState
    }

    initialState = {
        success: '', errors: ''
    }

    refreshPage() {
        window.location.reload(false)
    }

    handleSubmit = event => {
        event.preventDefault();
        this.addPost(event.target.title.value, event.target.body.value, event.target.author.value, event.target.type.value)
    }

    addPost(title, body, author, type) {
        fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                body: body,
                author: author,
                type: type
            })
        }).then(function (response) {
            if (response.status === 200) {
                this.setState({ "success": "You created post successfully!" })

                setTimeout(() => {
                    this.props.history.push('/')
                    this.refreshPage()
                }, 1000);
            }
        }.bind(this)).catch(function (error) {
            this.setState({ "errors": "Something went wrong!" })
        }.bind(this));
    }

    render() {
        const { t } = this.props;
        return (
            <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
                <h2 style={{ fontSize: "20px", color: "white", marginTop: "30px", marginBottom: "30px" }}>{t('AddNewPost.1')}</h2>
                <form onSubmit={this.handleSubmit}>
                    {this.state.errors && <Alert variant='danger'>{this.state.errors}</Alert>}
                    {this.state.success && <Alert variant='success'>{this.state.success}</Alert>}
                    <label style={{ textAlign: "left", display: "block", color: "white" }}>{t('BlogTitle.1')}</label>
                    <input
                        style={{ width: "100%", padding: "6px 10px", margin: "10px 0", border: "1px solid #ddd", boxSizing: "border-box", display: "block", borderRadius: "5px" }}
                        name="title"
                        type="text"
                        required
                    />
                    <label style={{ textAlign: "left", display: "block", color: "white" }}>{t('BlogBody.1')}</label>
                    <textarea
                        style={{ width: "100%", height: "200px", padding: "6px 10px", margin: "10px 0", border: "1px solid #ddd", boxSizing: "border-box", display: "block", borderRadius: "5px" }}
                        required
                        name="body"
                    />
                    <label style={{ textAlign: "left", display: "block", color: "white" }}>{t('BlogAuthor.1')}</label>
                    <input
                        style={{ width: "100%", padding: "6px 10px", margin: "10px 0", border: "1px solid #ddd", boxSizing: "border-box", display: "block", borderRadius: "5px" }}
                        type="text"
                        required
                        name="author"
                    />
                    <label style={{ textAlign: "left", display: "block", color: "white", marginBottom: "10px" }}>{t('BlogType.1')}</label>
                    <select name='type' style={{ padding: "6px 10px", margin: "10px 0", border: "1px solid #ddd", boxSizing: "border-box", display: "block", borderRadius: "5px", width: "100%" }}>
                        <option value="Sport">{t('Sport.1')}</option>
                        <option value="Education">{t('Education.1')}</option>
                        <option value="Music">{t('Music.1')}</option>
                        <option value="Other">{t('Other.1')}</option>
                    </select>

                    <button className="btn btn-primary" style={{ border: "0", padding: "8px", borderRadius: "8px", cursor: "pointer", marginTop: "20px" }}>{t('AddPostButton.1')}</button>
                </form>
            </div>
        );
    }
}

export default withTranslation()(CreatePost)