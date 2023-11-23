package pl.maciejklonicki.ytapp.users;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

    private final UserServiceImpl userServiceImpl;

    public UserController(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }
    @PostMapping
    public ResponseEntity<Users> addNewUser (@RequestBody Users users) {
        return userServiceImpl.addNewUser(users);
    }

    @PostMapping("/login")
    public ResponseEntity<Users> loginUser (@RequestBody Users users) {
        return userServiceImpl.logInUser(users);
    }
}
