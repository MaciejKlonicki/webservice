import React, { useState, useEffect } from 'react';

const PostDetails = ({ match }) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const postId = match.params.id;

        fetch(`http://localhost:8080/api/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => setPost(data));
    }, [match.params.id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 style={{ color: 'white' }}>{post.title}</h2>
            <p style={{ color: 'white' }}>Written by <b>{post.author}</b></p>
            <p style={{ color: 'white' }}>{post.body}</p>
        </div>
    );
};

export default PostDetails;
