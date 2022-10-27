package pl.maciejklonicki.ytapp.users;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

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
        Optional<Users> users = userService.getUserById(id);
        return users.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
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
