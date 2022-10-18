package pl.maciejklonicki.ytapp.users;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<Users> findAllUsers () {
        return userRepository.findAll();
    }

    public Users getUserById (Integer id) {
        return userRepository.findById(id).orElseThrow();
    }

    public ResponseEntity addNewUser (Users users) {
        Optional<Users> username = userRepository.findByEmail(users.getEmail());

        if (username.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }

        Users savedUsers = userRepository.save((users));
        return ResponseEntity.ok(savedUsers);
    }

    public ResponseEntity logInUser (Users users) {
        Optional<Users> loginUser = userRepository.findByEmail(users.getEmail());

        if (loginUser.isEmpty() || wrongPassword(loginUser, users)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok().build();
    }

    private boolean wrongPassword(Optional<Users> loginUser, Users users) {
        return !loginUser.get().getPassword().equals(users.getPassword());
    }


}
