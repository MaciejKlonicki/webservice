package pl.maciejklonicki.ytapp.users;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.maciejklonicki.ytapp.users.dto.UsersDTO;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping
    public ResponseEntity<Users> addNewUser (@RequestBody Users users) {
        return userService.addNewUser(users);
    }

    @PostMapping("/login")
    public ResponseEntity<Users> loginUser (@RequestBody UsersDTO usersDTO) {
        return userService.logInUser(usersDTO);
    }
}
