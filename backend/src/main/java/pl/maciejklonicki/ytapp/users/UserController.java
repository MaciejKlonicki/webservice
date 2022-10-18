package pl.maciejklonicki.ytapp.users;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    List<Users> findAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/{id}")
    private ResponseEntity<Users> findUserById (@PathVariable Integer id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PostMapping
    private ResponseEntity addNewUser (@RequestBody Users users) {
        return userService.addNewUser(users);
    }

    @PostMapping("/login")
    private ResponseEntity login (@RequestBody Users users) {
        return userService.logInUser(users);
    }

}
