import { Box, Rating } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { useHistory } from "react-router-dom"
import { withTranslation } from 'react-i18next'

const PostDetails = ({ match, t }) => {

    const [post, setPost] = useState(null)
    const [userRating, setUserRating] = useState(0)
    const history = useHistory()
    const postId = match.params.id
    const userEmail = localStorage.getItem("email")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await fetch(`http://localhost:8080/api/posts/${postId}`)
                const postData = await postResponse.json()
                setPost(postData)

                const ratingResponse = await fetch(`http://localhost:8080/api/post-ratings/get-rating?userEmail=${userEmail}&postId=${postId}`)
                const ratingData = await ratingResponse.json()
                setUserRating(ratingData.rating || 0)
            } catch (error) {
                console.error('Error:', error)
            }
        }

        fetchData()
    }, [postId, userEmail])

    const handleRatingChange = (rating) => {
        fetch(`http://localhost:8080/api/post-ratings/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userEmail,
                postId,
                rating: rating
            })
        })
            .then((response) => response.json())
            .then(() => {
                setUserRating(rating)
            })
            .catch((error) => console.error('Error:', error))
    }

    const cancel = () => {
        history.push('/')
        window.location.reload(true)
    }

    if (!post) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div>
                <h2 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>{post.title}</h2>
                <p style={{ color: 'white', textAlign: 'center', margin: '0px 200px 50px 200px' }}>{post.body}</p>
                <p style={{ color: 'white', textAlign: 'right', marginRight: '100px' }}>{t('Written.1')} <b>{post.author}</b></p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                        marginRight: '100px',
                    }}
                >
                    <Typography style={{ color: 'white' }} component="legend">{t('Rate.1')}</Typography>
                    <Rating
                        name="simple-controlled"
                        value={userRating}
                        onChange={(event, rating) => {
                            handleRatingChange(rating)
                            setUserRating(rating)
                        }}
                    />
                </Box>
            </div>
            <button
                onClick={cancel}
                className="btn btn-secondary"
                style={{
                    border: "0",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginTop: "5px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                    marginBottom: '15px'
                }}
            >
                {t('Back.1')}
            </button>
        </>
    )
}

export default withTranslation()(PostDetails)
