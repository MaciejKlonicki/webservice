package pl.maciejklonicki.ytapp.users;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    void checkIfNewUserIsAddingCorrectly() {
        Users users = new Users();
        users.setEmail("test@o2.pl");
        users.setUsername("user1");

        when(userRepository.findByEmail(users.getEmail())).thenReturn(Optional.empty());
        when(userRepository.findByUsername(users.getUsername())).thenReturn(Optional.empty());
        when(userRepository.save(users)).thenReturn(users);

        ResponseEntity<Users> response = userService.addNewUser(users);

        assertNotNull(response);
        assertEquals(ResponseEntity.ok(users), response);
        verify(userRepository, times(1)).findByEmail(users.getEmail());
        verify(userRepository, times(1)).findByUsername(users.getUsername());
        verify(userRepository, times(1)).save(users);
    }

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
    void checkIfUserIsLoggingSuccessfully() {
        Users existingUser = new Users();
        existingUser.setEmail("user@example.com");
        existingUser.setUsername("existinguser");
        existingUser.setPassword("password");

        when(userRepository.findByEmail(existingUser.getEmail())).thenReturn(Optional.of(existingUser));

        ResponseEntity<Users> response = userService.logInUser(existingUser);

        assertNotNull(response);
        assertEquals(ResponseEntity.ok().build(), response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(userRepository, times(1)).findByEmail(existingUser.getEmail());
    }

    @Test
    void checkIfUserCantLogInWithIncorrectPassword() {
        Users existingUser = new Users();
        existingUser.setEmail("user@example.com");
        existingUser.setUsername("existinguser");
        existingUser.setPassword("password");

        Users wrongPasswordUser = new Users();
        wrongPasswordUser.setEmail("user@example.com");
        wrongPasswordUser.setPassword("wrongpassword");

        when(userRepository.findByEmail(existingUser.getEmail())).thenReturn(Optional.of(existingUser));

        ResponseEntity<Users> response = userService.logInUser(wrongPasswordUser);

        assertNotNull(response);
        assertEquals(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(), response);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        verify(userRepository, times(1)).findByEmail(existingUser.getEmail());
    }

    @Test
    void checkIfUserCantLogInWithNonExistingUser() {
        Users nonExistingUser = new Users();
        nonExistingUser.setEmail("nonexisting@example.com");
        nonExistingUser.setPassword("password");

        when(userRepository.findByEmail(nonExistingUser.getEmail())).thenReturn(Optional.empty());

        ResponseEntity<Users> response = userService.logInUser(nonExistingUser);

        assertNotNull(response);
        assertEquals(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(), response);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        verify(userRepository, times(1)).findByEmail(nonExistingUser.getEmail());
    }
}