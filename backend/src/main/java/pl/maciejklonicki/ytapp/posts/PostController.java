package pl.maciejklonicki.ytapp.posts;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    private final PostServiceImpl postServiceImpl;

    public PostController(PostServiceImpl postServiceImpl) {
        this.postServiceImpl = postServiceImpl;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postServiceImpl.getAllPosts();
    }

    @GetMapping("/{id}")
    public Post getSinglePost(@PathVariable Long id) {
        return postServiceImpl.getSinglePost(id);
    }

    @PostMapping
    public ResponseEntity<Post> addPost (@RequestBody Post post) {
        return postServiceImpl.addPost(post);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postServiceImpl.deletePost(id);
    }

    @PutMapping("/{id}")
    public Post updatePost (@RequestBody Post post, @PathVariable Long id) {
        return postServiceImpl.updatePost(post, id);
    }
}
