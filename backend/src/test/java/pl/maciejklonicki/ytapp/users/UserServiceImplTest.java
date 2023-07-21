package pl.maciejklonicki.ytapp.users;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

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

    }

    @Test
    void checkIfErrorIsThrowingWhenNewUserHasTheSameUsername() {

    }

    @Test
    void checkIfUserIsLoggingSuccessfully() {

    }
}