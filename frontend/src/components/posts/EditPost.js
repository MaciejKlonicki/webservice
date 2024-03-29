import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom"
import PostService from "../service/PostService"
import { Container, FormGroup, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Input, Label, Alert } from 'reactstrap'
import { withTranslation } from 'react-i18next'
import { FiInfo } from "react-icons/fi"

const EditPost = ({ t, username }) => {

    const history = useHistory()
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [type, setType] = useState('')
    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState('')

    useEffect(() => {
        PostService.getPostById(id).then((res) => {
            let post = res.data
            setTitle(post.title)
            setBody(post.body)
            setType(post.type)

            if (post.author !== username && localStorage.getItem("role") !== 'ADMIN') {
                history.push('/')
                window.location.reload(true)
            }

        })
    }, [id, history, username])

    const updatePost = (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append('title', title)
        formData.append('body', body)
        formData.append('type', type)

        PostService.updatePost(formData, id).then((res) => {
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

    const changeTypeHandler = (event) => {
        setType(event.target.value)
    }

    const cancel = () => {
        history.push('/')
        window.location.reload(true)
    }

    const titleTooltip = (
        <Tooltip id="title-tooltip">
            Max length is 100 characters.
        </Tooltip>
    )

    const titles = <h2 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>{t('EditPost.1')}</h2>

    return (
        <Container>
            {errors && <Alert color='danger' style={{ marginTop: '10px', textAlign: 'center' }}>{errors}</Alert>}
            {success && <Alert variant='success' style={{ marginTop: '10px', textAlign: 'center' }}>{success}</Alert>}
            {titles}
            <Form>
                <FormGroup>
                    <Label for="title" style={{ color: 'white' }}>{t('BlogTitle.1')}</Label>
                    <OverlayTrigger placement="top" overlay={titleTooltip}>
                            <span style={{ marginLeft: '5px', cursor: 'pointer', color: 'white' }}><FiInfo style={{ marginBottom: '2px' }} /></span>
                        </OverlayTrigger>
                    <Input type="text" name="title" value={title} onChange={changeTitleHandler} />
                </FormGroup>
                <FormGroup>
                    <Label for="body" style={{ color: 'white' }}>{t('BlogBody.1')}</Label>
                    <Input type="textarea" name="body" value={body} onChange={changeBodyHandler} style={{ height: '200px' }} />
                </FormGroup>
                <FormGroup>
                    <Label for="type" style={{ color: 'white' }}>{t('BlogType.1')}</Label>
                    <Input type="select" name="type" value={type} onChange={changeTypeHandler}>
                        <option value="SPORT">{t('Sport.1')}</option>
                        <option value="EDUCATION">{t('Education.1')}</option>
                        <option value="MUSIC">{t('Music.1')}</option>
                        <option value="OTHER">{t('Other.1')}</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Button className="btn btn-secondary" style={{ marginTop: "10px", marginRight: '10px' }} onClick={cancel}>{t('Cancel.1')}</Button>
                    <Button style={{ marginTop: "10px" }} onClick={updatePost}>{t('UpdatePost.1')}</Button>
                </FormGroup>
            </Form>
        </Container>
    )
}

export default withTranslation()(EditPost)