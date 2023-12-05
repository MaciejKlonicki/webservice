import { Box, Rating } from '@mui/material';
import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'

const PostDetails = ({ match }) => {
    const [post, setPost] = useState(null)
    const [value, setValue] = React.useState(2)

    useEffect(() => {
        const postId = match.params.id

        fetch(`http://localhost:8080/api/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => setPost(data))
    }, [match.params.id])

    if (!post) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div>
                <h2 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>{post.title}</h2>
                <p style={{ color: 'white', textAlign: 'center', margin: "0px 100px 50px 100px" }}>{post.body}</p>
                <p style={{ color: 'white', textAlign: 'right', marginRight: "100px" }}>Written by <b>{post.author}</b></p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                        marginRight: "60px"
                    }}
                >
                    <Typography style={{ color: 'white' }} component="legend">Rate</Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </Box>
            </div>
        </>

    );
};

export default PostDetails
