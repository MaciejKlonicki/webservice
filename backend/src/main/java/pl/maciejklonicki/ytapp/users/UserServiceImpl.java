package pl.maciejklonicki.ytapp.users;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import pl.maciejklonicki.ytapp.users.dto.RegisterUserDTO;
import pl.maciejklonicki.ytapp.users.dto.UsersDTO;
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
    public ResponseEntity<Users> addNewUser (RegisterUserDTO registerUserDTO) {
        Optional<Users> userEmail = userRepository.findByEmail(registerUserDTO.email());
        Optional<Users> userName = userRepository.findByUsername(registerUserDTO.username());

        if (userEmail.isPresent() || userName.isPresent()) {
            throw new UsersEmailAlreadyExistsException(registerUserDTO.email());
        }

        String hashedPassword = hashPassword(registerUserDTO.password());

        Users newUser = new Users();
        newUser.setUsername(registerUserDTO.username());
        newUser.setEmail(registerUserDTO.email());
        newUser.setPassword(hashedPassword);
        newUser.setMobile(registerUserDTO.mobile());

        Users savedUser = userRepository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }

    @Override
    public ResponseEntity<Users> logInUser (UsersDTO usersDTO) {
        Optional<Users> loginUser = userRepository.findByEmail(usersDTO.email());

        if (loginUser.isEmpty() || wrongPassword(loginUser, usersDTO)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok().build();
    }

    private boolean wrongPassword(Optional<Users> loginUser, UsersDTO usersDTO) {
        if (loginUser.isEmpty()) {
            throw new UsersNotFoundException(usersDTO.email());
        }
        return !BCrypt.checkpw(usersDTO.password(), loginUser.get().getPassword());
    }

    private String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }
}
