import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { withTranslation } from 'react-i18next'
import RatingBox from './RatingBox'

const PostDetails = ({ match, t }) => {

    const [post, setPost] = useState(null)
    const [userRating, setUserRating] = useState(0)
    const history = useHistory()
    const postId = match.params.id
    const userEmail = localStorage.getItem("email")
    const [comment, setComment] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await fetch(`http://localhost:8080/api/v1/posts/${postId}`)
                const postData = await postResponse.json()
                setPost(postData)

                const ratingResponse = await fetch(`http://localhost:8080/api/v1/post-ratings/get-rating?userEmail=${userEmail}&postId=${postId}`)
                const ratingData = await ratingResponse.json()
                setUserRating(ratingData.rating || 0)
            } catch (error) {
                console.error('Error:', error)
            }
        }

        fetchData()
    }, [postId, userEmail])

    const handleRatingChange = (rating) => {
        fetch(`http://localhost:8080/api/v1/post-ratings/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
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

    const handleChangeRating = () => {
        history.push(`/edit-rating/${postId}`)
        window.location.reload(true)
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }

    const addComment = () => {
        fetch(`http://localhost:8080/api/v1/post-ratings/add-comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
                userEmail,
                postId,
                comment
            })
        })
            .then((response) => response.json())
            .then(() => {
                console.log("Comment added successfully!")
            })
            .catch((error) => console.error('Error:', error))
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

                {userEmail && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                        <RatingBox
                            value={userRating}
                            onChange={(event, rating) => {
                                handleRatingChange(rating);
                                setUserRating(rating);
                            }}
                            disabled={userRating !== 0}
                            t={t}
                            customStyle={{ marginRight: '30px' }}
                        />
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
                    {userRating > 0 && (
                        <button
                            onClick={() => handleChangeRating(post.id)}
                            className="btn btn-primary"
                            style={{
                                border: "0",
                                borderRadius: "8px",
                                cursor: "pointer",
                                marginTop: "5px",
                                marginRight: "70px"
                            }}
                        >
                            {t('ChangeRating.1')}
                        </button>
                    )}
                </div>
                <button
                    onClick={cancel}
                    className="btn btn-secondary"
                    style={{
                        border: "0",
                        borderRadius: "8px",
                        cursor: "pointer",
                        margin: "5px auto",
                        display: "block",
                        marginBottom: '15px'
                    }}
                >
                    {t('Back.1')}
                </button>
            </div>
            <div style={{ margin: "20px 200px" }}>
                <h3 style={{ color: 'white' }}>{t('AddComment.1')}</h3>
                {post.comments && post.comments.map((comment) => (
                    <div key={comment.id} style={{ marginBottom: "10px" }}>
                        <b>{comment.user.username}:</b> {comment.comment}
                    </div>
                ))}

                {userEmail && (
                    <div>
                        <textarea
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder={t('AddCommentPlaceholder.1')}
                            style={{
                                width: "100%",
                                marginBottom: "10px",
                                backgroundColor: "transparent",
                                border: "1px solid white",
                                borderRadius: "5px",
                                color: "white",
                                padding: "8px"
                            }}
                        />
                        <button
                            onClick={addComment}
                            className="btn btn-primary"
                            style={{
                                border: "0",
                                borderRadius: "8px",
                                cursor: "pointer"
                            }}
                        >
                            {t('AddComment.1')}
                        </button>
                    </div>
                )}
            </div>
        </>

    )
}

export default withTranslation()(PostDetails)
