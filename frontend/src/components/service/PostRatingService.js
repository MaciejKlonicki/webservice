import axios from 'axios'

const POST_RATING_URL = "http://localhost:8080/api/v1/post-ratings"

class PostRatingService {
    
    ratePost(userEmail, postId, rating) {
        return axios.post(POST_RATING_URL + '/rate', {
            userEmail,
            postId,
            rating
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
    }

}

export default PostRatingService