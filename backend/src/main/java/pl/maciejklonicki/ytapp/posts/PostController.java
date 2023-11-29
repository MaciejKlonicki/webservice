package pl.maciejklonicki.ytapp.posts;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
    public ResponseEntity<Post> addPost (
            @RequestParam("title") String title,
            @RequestParam("body") String body,
            @RequestParam("author") String author,
            @RequestParam("type") String type,
            @RequestParam("creationDate") String creationDate,
            @RequestParam("photo") MultipartFile photo) {
        Post post = new Post();
        post.setTitle(title);
        post.setBody(body);
        post.setAuthor(author);
        post.setType(type);
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            Date parsedDate = dateFormat.parse(creationDate);
            post.setCreationDate(parsedDate);
        } catch (ParseException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        try {
            post.setPhoto(photo.getBytes());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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
