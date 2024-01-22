import axios from 'axios'

const POST_URL = "http://localhost:8080/api/v1/posts"

const config = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
}

class PostService {
    
    getPostById(id) {
        return axios.get(POST_URL + '/' + id)
    }

    updatePost(post, id) {
        return axios.put(POST_URL + '/update/' + id, post, config)
    }

    incrementPopularity(postId) {
        return axios.put(POST_URL + `/${postId}/increment-popularity`)
    }

    averageRating(postId) {
        return axios.get(POST_URL + `/${postId}/average-rating`)
    }

    getPostsOrderedDescByCreationDateAndType(type) {
        return axios.get(`${POST_URL}/sorted-desc-by-creation-date?type=${type}`)
    }

    getPostsOrderedAscByCreationDateAndType(type) {
        return axios.get(`${POST_URL}/sorted-asc-by-creation-date?type=${type}`)
    }

    getPostsOrderedDescByPopularityAndType(type) {
        return axios.get(`${POST_URL}/sorted-desc-by-popularity?type=${type}`)
    }

    getPostsOrderedAscByPopularityAndType(type) {
        return axios.get(`${POST_URL}/sorted-asc-by-popularity?type=${type}`)
    }

    getPostsOrderedByRatingAndType(type) {
        return axios.get(`${POST_URL}/sorted-by-rating?type=${type}`)
    }
}

export default new PostService()
