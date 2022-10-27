package pl.maciejklonicki.ytapp.posts;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import pl.maciejklonicki.ytapp.users.UserRepository;
import pl.maciejklonicki.ytapp.users.Users;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public List<Post> allPosts () {
        return postRepository.findAll();
    }

    public ResponseEntity addPost (@RequestHeader("email") String email, @RequestBody String body) {
        Optional<Users> byEmail = userRepository.findByEmail(email);

        if (byEmail.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Post post = new Post(body, byEmail.get());
        Post savedPost = postRepository.save(post);

        return ResponseEntity.ok(savedPost);
    }
}
