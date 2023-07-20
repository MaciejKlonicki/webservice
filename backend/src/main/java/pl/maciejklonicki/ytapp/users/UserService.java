package pl.maciejklonicki.ytapp.users;

import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface UserService {
    Users getSingleUser(Long usersId);
    ResponseEntity addNewUser(Users users);
    ResponseEntity logInUser(Users users);

}
