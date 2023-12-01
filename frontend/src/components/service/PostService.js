import axios from 'axios';

const POST_URL = "http://localhost:8080/api/posts";

class PostService {
    getPostById(id) {
        return axios.get(POST_URL + '/' + id)
    }

    updatePost(post, id) {
        return axios.put(`http://localhost:8080/api/posts/${id}`, post, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
}

export default new PostService()