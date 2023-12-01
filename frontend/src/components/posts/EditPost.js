import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom"
import PostService from "../service/PostService"
import { Container, FormGroup, Form, Button } from 'react-bootstrap'
import { Input, Label, Alert } from 'reactstrap'
import { withTranslation } from 'react-i18next'

const EditPost = ({ t }) => {

    const history = useHistory()
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('')
    const [type, setType] = useState('')
    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState('')

    useEffect(() => {
        PostService.getPostById(id).then((res) => {
            let post = res.data
            setTitle(post.title)
            setBody(post.body)
            setAuthor(post.author)
            setType(post.type)
        })
    }, [id])

    const updatePost = (e) => {
        e.preventDefault()
        let post = { title: title, body: body, author: author, type: type }
        PostService.updatePost(post, id).then((res) => {
            setSuccess('Post updated successfully!')
            setTimeout(() => {
                history.push('/')
                window.location.reload(true)
            }, 1000)
        })
            .catch((error) => {
                setErrors('Something went wrong!')
            })
    }

    const changeTitleHandler = (event) => {
        setTitle(event.target.value)
    }

    const changeBodyHandler = (event) => {
        setBody(event.target.value)
    }

    const changeAuthorHandler = (event) => {
        setAuthor(event.target.value)
    }

    const changeTypeHandler = (event) => {
        setType(event.target.value)
    }

    const cancel = () => {
        history.push('/')
        window.location.reload(true)
    };

    const titles = <h2 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>{t('EditPost.1')}</h2>

    return (
        <Container>
            {errors && <Alert variant='danger' style={{ marginTop: '10px' }}>{errors}</Alert>}
            {success && <Alert variant='success' style={{ marginTop: '10px' }}>{success}</Alert>}
            {titles}
            <Form>
                <FormGroup>
                    <Label for="title" style={{ color: 'white' }}>{t('BlogTitle.1')}</Label>
                    <Input type="text" name="title" value={title} onChange={changeTitleHandler} />
                </FormGroup>
                <FormGroup>
                    <Label for="body" style={{ color: 'white' }}>{t('BlogBody.1')}</Label>
                    <Input type="textarea" name="body" value={body} onChange={changeBodyHandler} style={{ height: '200px' }} />
                </FormGroup>
                <FormGroup>
                    <Label for="author" style={{ color: 'white' }}>{t('BlogAuthor.1')}</Label>
                    <Input type="text" name="author" value={author} onChange={changeAuthorHandler} />
                </FormGroup>
                <FormGroup>
                    <Label for="type" style={{ color: 'white' }}>{t('BlogType.1')}</Label>
                    <Input type="select" name="type" value={type} onChange={changeTypeHandler}>
                        <option value="Sport">{t('Sport.1')}</option>
                        <option value="Education">{t('Education.1')}</option>
                        <option value="Music">{t('Music.1')}</option>
                        <option value="Other">{t('Other.1')}</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Button style={{ marginTop: "10px" }} onClick={updatePost}>{t('UpdatePost.1')}</Button>{' '}
                    <Button className="btn btn-secondary" style={{ marginTop: "10px" }} onClick={cancel}>{t('Cancel.1')}</Button>
                </FormGroup>
            </Form>
        </Container>
    );
}

export default withTranslation()(EditPost)