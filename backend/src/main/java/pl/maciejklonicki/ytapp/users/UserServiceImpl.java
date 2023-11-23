package pl.maciejklonicki.ytapp.users;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import pl.maciejklonicki.ytapp.users.exception.UsersEmailAlreadyExistsException;
import pl.maciejklonicki.ytapp.users.exception.UsersNotFoundException;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<Users> addNewUser (Users users) {
        Optional<Users> userEmail = userRepository.findByEmail(users.getEmail());
        Optional<Users> userName = userRepository.findByUsername(users.getUsername());

        if (userEmail.isPresent() || userName.isPresent()) {
            throw new UsersEmailAlreadyExistsException(users.getEmail());
        }

        String hashedPassword = hashPassword(users.getPassword());
        users.setPassword(hashedPassword);

        Users savedUsers = userRepository.save((users));
        return ResponseEntity.ok(savedUsers);
    }

    @Override
    public ResponseEntity<Users> logInUser (Users users) {
        Optional<Users> loginUser = userRepository.findByEmail(users.getEmail());

        if (loginUser.isEmpty() || wrongPassword(loginUser, users)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok().build();
    }

    private boolean wrongPassword(Optional<Users> loginUser, Users users) {
        if (loginUser.isEmpty()) {
            throw new UsersNotFoundException(users.getId());
        }
        return !BCrypt.checkpw(users.getPassword(), loginUser.get().getPassword());
    }

    private String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }
}
