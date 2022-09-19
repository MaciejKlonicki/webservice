package pl.maciejklonicki.ytapp.users;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping
    List<Users> findAllUsers() {
        return userService.findAllUsers();
    }

    @PostMapping
    ResponseEntity addNewUser (@RequestBody Users users) {
        return userService.addNewUser(users);
    }

}
