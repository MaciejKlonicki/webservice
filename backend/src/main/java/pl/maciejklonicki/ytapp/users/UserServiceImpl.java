package pl.maciejklonicki.ytapp.users;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.maciejklonicki.ytapp.users.exception.UsersNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Users getSingleUser (Long usersId) {
        return userRepository.findById(usersId).orElseThrow(() -> new UsersNotFoundException(usersId));
    }

    @Override
    public ResponseEntity addNewUser (Users users) {
        Optional<Users> username = userRepository.findByEmail(users.getEmail());

        if (username.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }

        Users savedUsers = userRepository.save((users));
        return ResponseEntity.ok(savedUsers);
    }

    @Override
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
