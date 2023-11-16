package pl.maciejklonicki.ytapp.users;

import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<Users> addNewUser(Users users);
    ResponseEntity<Users> logInUser(Users users);

}
