import axios from 'axios';

const POST_URL = "http://localhost:8080/api/posts";

class PostService {
    getPostById(id) {
        return axios.get(POST_URL + '/' + id);
    }

    updatePost(post, id) {
        return axios.put(POST_URL + '/' + id, post);
    }

    incrementPopularity(postId) {
        return axios.put(POST_URL + `/${postId}/increment-popularity`);
    }

    sortByCreationDate() {
        return axios.get(POST_URL + '/sorted-by-creation-date');
    }

    sortByPopularity() {
        return axios.get(POST_URL + '/sorted-by-popularity');
    }
}

export default new PostService();
