package pl.maciejklonicki.ytapp.users;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import pl.maciejklonicki.ytapp.users.dto.RegisterUserDTO;
import pl.maciejklonicki.ytapp.users.dto.UsersDTO;
import pl.maciejklonicki.ytapp.users.exception.UsersEmailAlreadyExistsException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @Test
    void checkIfUserCanLoginWithCorrectIdentifiers() {
        UsersDTO usersDTO = new UsersDTO("email@email.com", "password");
        Users userWithMatchingPassword = new Users();
        userWithMatchingPassword.setEmail("email@email.com");
        userWithMatchingPassword.setPassword(BCrypt.hashpw("password", BCrypt.gensalt()));

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(userWithMatchingPassword));

        ResponseEntity<Users> usersResponseEntity = userService.logInUser(usersDTO);

        assertEquals(HttpStatus.OK, usersResponseEntity.getStatusCode());
        verify(userRepository, times(1)).findByEmail(eq("email@email.com"));
    }

    @Test
    void checkIfUserCannotLoginUnauthorized() {
        UsersDTO usersDTO = new UsersDTO("error@email.com", "wrongPassword");

        ResponseEntity<Users> usersResponseEntity = userService.logInUser(usersDTO);
        assertEquals(HttpStatus.UNAUTHORIZED, usersResponseEntity.getStatusCode());
        verify(userRepository, times(1)).findByEmail(eq("error@email.com"));
    }
}