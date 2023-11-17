package pl.maciejklonicki.ytapp.posts;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public ResponseEntity addPost (Post newPost) {

        Post savedPost = postRepository.save(newPost);
        return ResponseEntity.ok(savedPost);
    }
}
