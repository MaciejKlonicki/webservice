package pl.maciejklonicki.ytapp.users;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<Users> findAllUsers () {
        return userRepository.findAll();
    }

    public ResponseEntity addNewUser (Users users) {
        List<Users> username = userRepository.findByUsername(users.getUsername());

        if (!username.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }
        Users savedUsers = userRepository.save((users));
        return ResponseEntity.ok(savedUsers);
    }
}
