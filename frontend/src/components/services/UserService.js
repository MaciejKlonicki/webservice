import axios from "axios";

const USER_API_URL = "http://localhost:8080/api/users";

class UserService {
    
    getUserById(userID) {
        return axios.get(USER_API_URL + '/' + userID);
    }

    getUsers() {
        return axios.get(USER_API_URL);
    }
}

export default new UserService();