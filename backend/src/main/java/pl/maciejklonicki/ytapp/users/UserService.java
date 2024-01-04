package pl.maciejklonicki.ytapp.users;

import org.springframework.http.ResponseEntity;
import pl.maciejklonicki.ytapp.users.dto.RegisterUserDTO;
import pl.maciejklonicki.ytapp.users.dto.UsersDTO;

public interface UserService {
    ResponseEntity<Users> addNewUser (RegisterUserDTO registerUserDTO);
    public ResponseEntity<Users> logInUser (UsersDTO usersDTO);
}
