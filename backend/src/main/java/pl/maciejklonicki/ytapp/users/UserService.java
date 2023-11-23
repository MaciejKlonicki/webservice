package pl.maciejklonicki.ytapp.users;

import org.springframework.http.ResponseEntity;
import pl.maciejklonicki.ytapp.users.dto.UsersDTO;

public interface UserService {
    ResponseEntity<Users> addNewUser(Users users);
    public ResponseEntity<Users> logInUser (UsersDTO usersDTO);
}
