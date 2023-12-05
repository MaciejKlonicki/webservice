package pl.maciejklonicki.ytapp.posts;

import org.springframework.data.domain.Page;
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

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<Page<Post>> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String searchTerm
    ) {
        Page<Post> postPage = postService.getAllPosts(page, size, type, searchTerm);
        return new ResponseEntity<>(postPage, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Post getSinglePost(@PathVariable Long id) {
        return postService.getSinglePost(id);
    }

    @PostMapping
    public ResponseEntity<Post> addPost(
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
        return postService.addPost(post);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }

    @PutMapping("/{id}")
    public Post updatePost(@RequestParam("title") String title,
                           @RequestParam("body") String body,
                           @RequestParam("author") String author,
                           @RequestParam("type") String type,
                           @RequestParam("photo") MultipartFile photo, @PathVariable Long id) throws IOException {
        Post post = new Post();
        post.setTitle(title);
        post.setBody(body);
        post.setAuthor(author);
        post.setType(type);
        post.setPhoto(photo.getBytes());
        return postService.updatePost(post, id);
    }

    @PutMapping("/{id}/increment-popularity")
    public ResponseEntity<Void> incrementPostPopularity(@PathVariable Long id) {
        postService.incrementPostPopularity(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/sorted-by-popularity")
    public ResponseEntity<List<Post>> getPostsSortedByPopularity(@RequestParam(name = "type", defaultValue = "All") String type) {
        List<Post> sortedPosts = postService.getPostsOrderedByPopularityFilteredByType(type);
        return ResponseEntity.ok(sortedPosts);
    }

    @GetMapping("/sorted-by-creation-date")
    public ResponseEntity<List<Post>> getPostsSortedByCreationDate(@RequestParam(name = "type", defaultValue = "All") String type) {
        List<Post> sortedPosts = postService.getPostsOrderedByCreationDateFilteredByType(type);
        return ResponseEntity.ok(sortedPosts);
    }
}
