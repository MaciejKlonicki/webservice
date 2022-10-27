package pl.maciejklonicki.ytapp.users;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks UserService userService;
    @Mock UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        userService = new UserService(userRepository);
    }

    @Test
    void canFindAllUsers() {
        //when
        userService.findAllUsers();
        //then
        verify(userRepository).findAll();

    }

    @Test
    void canGetUserById() {
        //when
        userService.getUserById(5);
        //then
        verify(userRepository).findById(5);
    }

    @Test
    void canAddNewUser() {
        //given
        Users users = new Users(
                "Maciek",
                "maciek@o2.pl",
                "klon123",
                "609978876"
        );
        //when
        userService.addNewUser(users);
        //then
        ArgumentCaptor<Users> usersArgumentCaptor = ArgumentCaptor.forClass(Users.class);
        verify(userRepository).save(usersArgumentCaptor.capture());
        Users capturedUsers = usersArgumentCaptor.getValue();
        assertThat(capturedUsers).isEqualTo(users);
    }
}