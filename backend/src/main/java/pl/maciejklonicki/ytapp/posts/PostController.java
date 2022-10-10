package pl.maciejklonicki.ytapp.posts;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    private final PostService postService;

    @GetMapping
    List<Post> findAllPosts() {
        return postService.allPosts();
    }

    @PostMapping
    public ResponseEntity addPost (@RequestHeader("email") String email, @RequestBody String body) {
        return postService.addPost(email, body);
    }
}
