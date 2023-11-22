package pl.maciejklonicki.ytapp.posts;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<Post> getAllPosts () {
        return postRepository.findAll();
    }

    public Post getSinglePost (Long id) {
        return postRepository.findById(id).orElseThrow();
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
