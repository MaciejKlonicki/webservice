import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import i18n from '../../i18next';


class CreatePost extends Component {

    constructor(props) {
        super(props);
        this.createPostAlert = React.createRef();
        this.state = this.initialState;
    }

    initialState = {
        success: '', errors: ''
    }

    refreshPage() {
        window.location.reload(false);
    }

    handleClick = (lang) => {
        i18n.changeLanguage(lang);
    }

    handleSubmit = event => {
        event.preventDefault();
        this.addPost(event.target.title.value, event.target.body.value, event.target.author.value);
    }

    addPost(title, body, author) {
        fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                body: body,
                author: author
            })
        }).then(function (response) {
            if (response.status === 200) {
                this.setState({ "success": "You created post successfully!" });

                setTimeout(() => {
                    this.props.history.push('/');
                    this.refreshPage()
                }, 2000);
            }
        }.bind(this)).catch(function (error) {
            this.setState({ "errors": "Something went wrong!" })
        }.bind(this));
    }

    render() {
        const { t } = this.props;
        return (
            <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
                <h2 style={{ fontSize: "20px", color: "white", marginTop: "30px", marginBottom: "30px" }}>Add new post</h2>
                <form onSubmit={this.handleSubmit}>
                {this.state.errors && <Alert variant='danger'>{this.state.errors}</Alert>}
                {this.state.success && <Alert variant='success'>{this.state.success}</Alert>}
                    <label style={{ textAlign: "left", display: "block", color: "white" }}>Blog title:</label>
                    <input
                        style={{ width: "100%", padding: "6px 10px", margin: "10px 0", border: "1px solid #ddd", boxSizing: "border-box", display: "block", borderRadius: "5px" }}
                        name="title"
                        type="text"
                        required
                    />
                    <label style={{ textAlign: "left", display: "block", color: "white" }}>Body:</label>
                    <textarea
                        style={{ width: "100%", padding: "6px 10px", margin: "10px 0", border: "1px solid #ddd", boxSizing: "border-box", display: "block", borderRadius: "5px" }}
                        required
                        name="body"
                    />
                    <label style={{ textAlign: "left", display: "block", color: "white" }}>Author:</label>
                    <input
                        style={{ width: "100%", padding: "6px 10px", margin: "10px 0", border: "1px solid #ddd", boxSizing: "border-box", display: "block", borderRadius: "5px" }}
                        type="text"
                        required
                        name="author"
                    />
                    <button className="btn btn-primary" style={{ border: "0", padding: "8px", borderRadius: "8px", cursor: "pointer", marginTop: "20px" }}>Add post</button>
                </form>
            </div>
        );
    }
}

export default withTranslation()(CreatePost);