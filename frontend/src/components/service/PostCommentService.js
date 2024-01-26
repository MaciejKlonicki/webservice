import axios from 'axios'

const POST_COMMENT_URL = "http://localhost:8080/api/v1/post-ratings"

class PostCommentService {
    
    addComment(userEmail, postId, comment) {
        return axios.post(POST_COMMENT_URL + '/add-comment', {
            userEmail,
            postId,
            comment
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
    }

    editComment(commentId, userEmail, editedComment) {
        return axios.put(`${POST_COMMENT_URL}/edit-comment/${commentId}`, {
            userEmail,
            editedComment
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
    }

    deleteComment(commentId, userEmail) {
        return axios.delete(`${POST_COMMENT_URL}/delete-comment/${commentId}`, {
            params: {
                userEmail
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
    }
}

export default PostCommentService