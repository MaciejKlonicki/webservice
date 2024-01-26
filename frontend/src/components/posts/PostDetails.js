import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { withTranslation } from 'react-i18next'
import RatingBox from './RatingBox'
import Table from 'react-bootstrap/Table'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md'
import { Alert } from 'react-bootstrap'

const PostDetails = ({ match, t }) => {

    const [post, setPost] = useState(null)
    const [userRating, setUserRating] = useState(0)
    const history = useHistory()
    const postId = match.params.id
    const isAdmin = localStorage.getItem('role') === 'ADMIN'
    const userEmail = localStorage.getItem("email")
    const username = localStorage.getItem("username")
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const recordPerPage = 12
    const [hoveredCommentId, setHoveredCommentId] = useState(null)
    const setHoveredIcon = useState(null)
    const [success, setSuccess] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedComment, setEditedComment] = useState("")
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [showEditDeleteIcons, setShowEditDeleteIcons] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const commentsResponse = await fetch(`http://localhost:8080/api/v1/post-ratings/get-comments?page=${currentPage - 1}&size=${recordPerPage}&postId=${postId}`)
                const commentsData = await commentsResponse.json()

                setComments(commentsData.content || [])
                setTotalPages(commentsData.totalPages)

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
    }, [postId, userEmail, currentPage])

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
            .then((response) => {
                response.json()
            })
            .then(() => {
                window.location.reload()
            })
            .catch((error) => console.error('Error:', error))
    }

    const editComment = async (commentId) => {
        try {
            await fetch(`http://localhost:8080/api/v1/post-ratings/edit-comment/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({
                    userEmail,
                    editedComment
                })
            })

            const updatedComments = comments.map(comment =>
                comment.commentId === commentId ? { ...comment, comment: editedComment } : comment
            )

            setComments(updatedComments)
            setIsEditing(false)
            setEditedComment("")
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const deleteComment = async (commentId) => {
        await fetch(`http://localhost:8080/api/v1/post-ratings/delete-comment/${commentId}?userEmail=${userEmail}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(() => {
            let updateComment = [...comments].filter(i => i.commentId !== commentId)
            setComments(updateComment)
            setSuccess('You deleted comment successfully!')
            setTimeout(() => {
                setSuccess(null)
            }, 2000)
        })
    }

    const showNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const showPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleMouseEnter = (commentId) => {
        setHoveredCommentId(commentId)
    }

    const handleMouseLeave = () => {
        setHoveredCommentId(null)
    }

    const handleEditIconClick = (commentId) => {
        setIsEditing(true)
        setEditedComment(comments.find(comment => comment.commentId === commentId).comment)
        setEditingCommentId(commentId)
        setShowEditDeleteIcons(false)
    }

    const handleAcceptEditClick = async () => {
        await editComment(editingCommentId)
        setIsEditing(false)
        setEditingCommentId(null)
        setShowEditDeleteIcons(true)
    }

    const handleCancelEditClick = () => {
        setIsEditing(false)
        setEditedComment("")
        setEditingCommentId(null)
        setShowEditDeleteIcons(true)
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
                                handleRatingChange(rating)
                                setUserRating(rating)
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
                {userEmail && (
                    <h3 style={{ color: 'white' }}>{t('AddComment.1')}</h3>
                )}
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
                <div style={{ marginTop: '20px' }}>
                    <h3 style={{ color: 'white' }}>{t('Comments.1')}</h3>
                    {success && <Alert variant='success' style={{ textAlign: 'center' }}>{success}</Alert>}
                    <Table style={{ marginBottom: '50px' }} striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>{t('BlogAuthor.1')}</th>
                                <th>{t('Comments.1')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((comment, index) => (
                                <tr
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter(comment.commentId)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <td>{comment.username}</td>
                                    <td style={{ width: '800px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                {isEditing && comment.commentId === editingCommentId ? (
                                                    <input
                                                        type="text"
                                                        value={editedComment}
                                                        onChange={(e) => setEditedComment(e.target.value)}
                                                        style={{
                                                            backgroundColor: 'transparent',
                                                            border: '1px solid white',
                                                            borderRadius: '3px',
                                                            color: 'white', 
                                                            padding: '5px',
                                                            width: '600px'
                                                        }}
                                                    />
                                                ) : (
                                                    comment.comment
                                                )}
                                            </div>
                                            {(isAdmin || (hoveredCommentId === comment.commentId && username === comment.username)) && (
                                                <>
                                                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}></div>
                                                    {showEditDeleteIcons && (
                                                        <>
                                                            <MdModeEdit
                                                                onMouseEnter={() => setHoveredIcon('edit')}
                                                                onMouseLeave={() => setHoveredIcon(null)}
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    handleEditIconClick(comment.commentId)
                                                                }}
                                                                style={{
                                                                    marginTop: '3px',
                                                                    color: "blue",
                                                                    cursor: "pointer",
                                                                    fontSize: "1.5em",
                                                                    marginLeft: '10px'
                                                                }}
                                                            />
                                                            <MdDeleteForever
                                                                onMouseEnter={() => setHoveredIcon('delete')}
                                                                onMouseLeave={() => setHoveredIcon(null)}
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    deleteComment(comment.commentId)
                                                                }}
                                                                style={{
                                                                    marginTop: '3px',
                                                                    color: "red",
                                                                    cursor: "pointer",
                                                                    fontSize: "1.5em"
                                                                }}
                                                            />
                                                        </>
                                                    )}
                                                    {isEditing && comment.commentId === editingCommentId && (
                                                        <div>
                                                            <button style={{ marginRight: '5px' }} className="btn btn-primary" onClick={handleAcceptEditClick}>
                                                                Accept
                                                            </button>
                                                            <button className="btn btn-danger" onClick={handleCancelEditClick}>
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ul class="pagination" style={{ marginTop: '30px', position: "absolute", left: '200px' }}>
                        <li class="page-item">
                            <button
                                type="button"
                                class="page-link"
                                disabled={currentPage === 1 ? true : false}
                                onClick={showPrevPage}
                                className='btn btn-primary'
                                style={{ marginRight: '5px' }}
                            >
                                {t('Previous.1')}
                            </button>
                        </li>
                        <li class="page-item">
                            <button
                                type="button"
                                class="page-link"
                                disabled={currentPage === totalPages ? true : false}
                                onClick={showNextPage}
                                className='btn btn-primary'
                                style={{ marginBottom: '50px' }}
                            >
                                {t('Next.1')}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default withTranslation()(PostDetails)
