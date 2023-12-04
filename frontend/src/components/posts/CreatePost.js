import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { Container, FormGroup, Form, Button } from 'react-bootstrap'
import { Input, Label, Alert } from 'reactstrap'


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

    routeChange = () => {
        let postDetails = '/'
        this.props.history.push(postDetails)
        window.location.reload(true)
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
            this.setState({ "errors": "Something went wrong!" })
        })
    }

    render() {
        const { t } = this.props;
        return (
            <Container>
                <h2 style={{ color: 'white', marginTop: '20px', textAlign: 'center' }}>{t('AddNewPost.1')}</h2>
                <Form onSubmit={this.handleSubmit}>
                    {this.state.errors && <Alert variant='danger'>{this.state.errors}</Alert>}
                    {this.state.success && <Alert variant='success'>{this.state.success}</Alert>}
                    <FormGroup>
                        <Label style={{ textAlign: 'left', display: 'block', color: 'white' }}>{t('BlogTitle.1')}</Label>
                        <Input
                            style={{ width: '100%', padding: '6px 10px', border: '1px solid #ddd', boxSizing: 'border-box', display: 'block', borderRadius: '5px' }}
                            name='title'
                            type='text'
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ textAlign: 'left', display: 'block', color: 'white' }}>{t('BlogBody.1')}</Label>
                        <Input
                            style={{ width: '100%', height: '200px', padding: '6px 10px', border: '1px solid #ddd', boxSizing: 'border-box', display: 'block', borderRadius: '5px' }}
                            required
                            name='body'
                            type='textarea'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ textAlign: 'left', display: 'block', color: 'white' }}>{t('BlogAuthor.1')}</Label>
                        <Input
                            style={{ width: '100%', padding: '6px 10px', border: '1px solid #ddd', boxSizing: 'border-box', display: 'block', borderRadius: '5px' }}
                            type='text'
                            required
                            name='author'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ textAlign: 'left', display: 'block', color: 'white', marginBottom: '10px' }}>{t('BlogType.1')}</Label>
                        <Input
                            type='select'
                            name='type'
                            style={{ padding: '6px 10px', border: '1px solid #ddd', boxSizing: 'border-box', display: 'block', borderRadius: '5px', width: '100%' }}
                        >
                            <option value='Sport'>{t('Sport.1')}</option>
                            <option value='Education'>{t('Education.1')}</option>
                            <option value='Music'>{t('Music.1')}</option>
                            <option value='Other'>{t('Other.1')}</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="photo" style={{ color: 'white' }}>{t('BlogPhoto.1')}</Label>
                        <Input type="file" name="photo" accept="image/*" />
                    </FormGroup>
                    <FormGroup>
                        <Button className='btn btn-secondary' style={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px' }} onClick={this.routeChange}>
                            {t('Cancel.1')}
                        </Button>
                        <Button className='btn btn-primary' style={{ marginTop: '10px', marginBottom: '10px' }}>
                            {t('AddPostButton.1')}
                        </Button>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}

export default withTranslation()(CreatePost)