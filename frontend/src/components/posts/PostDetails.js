import { Box, Rating } from '@mui/material';
import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { useHistory } from "react-router-dom"

const PostDetails = ({ match }) => {
    const [post, setPost] = useState(null)
    const [value, setValue] = React.useState(2)
    const history = useHistory()

    useEffect(() => {
        const postId = match.params.id

        fetch(`http://localhost:8080/api/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => setPost(data))
    }, [match.params.id])

    const handleRatingChange = (newValue) => {
        const postId = match.params.id
        const userEmail = localStorage.getItem("email")

        fetch(`http://localhost:8080/api/post-ratings/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail,
                postId,
                rating: newValue,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
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
                <p style={{ color: 'white', textAlign: 'right', marginRight: '100px' }}>Written by <b>{post.author}</b></p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                        marginRight: '100px',
                    }}
                >
                    <Typography style={{ color: 'white' }} component="legend">Rate</Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            handleRatingChange(newValue);
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
                Go back
            </button>
        </>
    );
};

export default PostDetails
