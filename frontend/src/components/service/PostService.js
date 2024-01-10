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

    getPostsOrderedByCreationDateAndType(type) {
        return axios.get(`${POST_URL}/sorted-by-creation-date?type=${type}`)
    }

    getPostsOrderedByPopularityAndType(type) {
        return axios.get(`${POST_URL}/sorted-by-popularity?type=${type}`)
    }

    getPostsOrderedByRatingAndType(type) {
        return axios.get(`${POST_URL}/sorted-by-rating?type=${type}`)
    }
}

export default new PostService()
