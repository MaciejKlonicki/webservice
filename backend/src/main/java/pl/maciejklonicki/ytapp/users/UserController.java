package pl.maciejklonicki.ytapp.users;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    @GetMapping("/users")
    List<Users> findAllUsers() {
        return userService.findAllUsers();
    }

    @PostMapping("/users")
    private ResponseEntity addNewUser (@RequestBody Users users) {
        return userService.addNewUser(users);
    }

    @PostMapping("/login")
    private ResponseEntity login (@RequestBody Users users) {
        return userService.logInUser(users);
    }

}
