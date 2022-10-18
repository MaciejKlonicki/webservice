import axios from "axios";

const USER_API_URL = "http://localhost:8080/api/users";

class UserService {
    
    getUserById(userID) {
        return axios.get(USER_API_URL + '/' + 61);
    }
}

export default new UserService();