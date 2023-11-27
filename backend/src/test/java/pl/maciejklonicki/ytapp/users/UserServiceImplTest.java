package pl.maciejklonicki.ytapp.users;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
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
    void checkIfErrorIsThrowingWhenNewUserHasTheSameEmail() {
        Users existingUser = new Users();
        existingUser.setEmail("existing@example.com");
        existingUser.setUsername("existinguser");

        Users newUser = new Users();
        newUser.setEmail("existing@example.com");
        newUser.setUsername("newuser");

        when(userRepository.findByEmail(existingUser.getEmail())).thenReturn(Optional.of(existingUser));
        when(userRepository.findByUsername(newUser.getUsername())).thenReturn(Optional.empty());

        assertThrows(UsersEmailAlreadyExistsException.class, () -> {
            userService.addNewUser(newUser);
        });

        verify(userRepository, times(1)).findByEmail(existingUser.getEmail());
        verify(userRepository, times(1)).findByUsername(newUser.getUsername());
        verify(userRepository, never()).save(newUser);
    }

    @Test
    void checkIfPasswordIsHashed() {
        Users users = new Users();
        users.setEmail("email@email.com");
        users.setUsername("username");
        users.setPassword("password");
        users.setMobile("123456789");

        ResponseEntity<Users> response = userService.addNewUser(users);

        assertEquals(200, response.getStatusCodeValue());

        String hashedPassword = users.getPassword();
        assertTrue(BCrypt.checkpw("password", hashedPassword));

        verify(userRepository, times(1)).save(any(Users.class));
    }

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