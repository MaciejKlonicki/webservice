import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom"
import PostService from "../service/PostService"
import { Container, FormGroup, Form, Button } from 'react-bootstrap'
import { Input, Label } from 'reactstrap'
import { withTranslation } from 'react-i18next'

const EditPost = ({ t }) => {

    const history = useHistory()
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('')

    useEffect(() => {
        PostService.getPostById(id).then((res) => {
            let post = res.data
            setTitle(post.title)
            setBody(post.body)
            setAuthor(post.author)
        })
    }, [id])

    const updatePost = (e) => {
        e.preventDefault()
        let post = { title: title, body: body, author: author }
        PostService.updatePost(post, id).then((res) => {
            history.push('/')
            window.location.reload(true)
        });
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

    const cancel = () => {
        history.push('/')
        window.location.reload(true)
    };

    const titles = <h2 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>{t('EditPost.1')}</h2>

    return (
        <Container>
            {titles}
            <Form>
                <FormGroup>
                    <Label for="title" style={{ color: 'white' }}>{t('BlogTitle.1')}</Label>
                    <Input type="text" name="title" value={title} onChange={changeTitleHandler} />
                </FormGroup>
                <FormGroup>
                    <Label for="body" style={{ color: 'white' }}>{t('BlogBody.1')}</Label>
                    <Input type="text" name="body" value={body} onChange={changeBodyHandler} />
                </FormGroup>
                <FormGroup>
                    <Label for="author" style={{ color: 'white' }}>{t('BlogAuthor.1')}</Label>
                    <Input type="text" name="author" value={author} onChange={changeAuthorHandler} />
                </FormGroup>
                <FormGroup>
                    <Button style={{ marginTop: "10px" }} onClick={updatePost}>{t('UpdatePost.1')}</Button>{' '}
                    <Button style={{ marginTop: "10px" }} onClick={cancel}>{t('Cancel.1')}</Button>
                </FormGroup>
            </Form>
        </Container>
    );
}

export default withTranslation()(EditPost)