package pl.maciejklonicki.ytapp.users;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userServiceImpl;

    @PostMapping
    private ResponseEntity<Users> addNewUser (@RequestBody Users users) {
        return userServiceImpl.addNewUser(users);
    }

    @PostMapping("/login")
    private ResponseEntity<Users> loginUser (@RequestBody Users users) {
        return userServiceImpl.logInUser(users);
    }

}
