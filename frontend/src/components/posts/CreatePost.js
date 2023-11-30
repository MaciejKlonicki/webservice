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

        const formData = new FormData();
        const title = event.target.title.value;
        const body = event.target.body.value;
        const author = event.target.author.value;
        const type = event.target.type.value;
        const photo = event.target.photo.files[0];

        if (!title || !body || !author || !type || !photo) {
            this.setState({ "errors": "Please fill in all the fields." });
            return;
        }
        
        formData.append('title', event.target.title.value);
        formData.append('body', event.target.body.value);
        formData.append('author', event.target.author.value);
        formData.append('type', event.target.type.value);
        formData.append('creationDate', new Date().toISOString());
        formData.append('photo', event.target.photo.files[0]);

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
                }, 1000);
            }
        }).catch(error => {
            this.setState({ "errors" : "Something went wrong!"})
        })
    }

    render() {
        const { t } = this.props;
        return (
            <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
                <h2 style={{ fontSize: "20px", color: "white", marginTop: "20px", marginBottom: "10px" }}>{t('AddNewPost.1')}</h2>
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
                    <label style={{ textAlign: "left", display: "block", color: "white", width: '100%' }}>{t('BlogPhoto.1')}</label>
                    <input
                        style={{ padding: "6px 10px", margin: "10px 0", border: "1px solid #ddd", boxSizing: "border-box", display: "block", borderRadius: "5px", width: "100%", color: 'white' }}
                        type="file"
                        accept="image/*"
                        name="photo"
                    />
                    <button className="btn btn-primary" style={{ border: "0", padding: "8px", borderRadius: "8px", cursor: "pointer", marginTop: "5px", marginBottom: '10px' }}>{t('AddPostButton.1')}</button>
                </form>
            </div>
        );
    }
}

export default withTranslation()(CreatePost)