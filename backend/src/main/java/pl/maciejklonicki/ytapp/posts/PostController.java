package pl.maciejklonicki.ytapp.posts;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.maciejklonicki.ytapp.posts.dto.CreatePostDTO;
import pl.maciejklonicki.ytapp.posts.dto.GetAllPostsDTO;
import pl.maciejklonicki.ytapp.posts.dto.SinglePostDTO;
import pl.maciejklonicki.ytapp.posts.dto.UpdatePostDTO;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<Page<GetAllPostsDTO>> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) PostType type,
            @RequestParam(required = false) String searchTerm
    ) {
        Page<GetAllPostsDTO> postPage = postService.getAllPosts(page, size, type, searchTerm);
        return new ResponseEntity<>(postPage, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SinglePostDTO> getSinglePost(@PathVariable Long id) {
        SinglePostDTO singlePost = postService.getSinglePostDTO(id);
        return ResponseEntity.ok(singlePost);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<Page<GetAllPostsDTO>> getPostsByUser(
            @PathVariable String username,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        Page<GetAllPostsDTO> postPage = postService.getPostsByUser(username, page, size);
        return new ResponseEntity<>(postPage, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Post> addPost(@ModelAttribute CreatePostDTO createPostDTO) {
        if (createPostDTO.photo() != null && createPostDTO.photo().getSize() > 1024 * 1024) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return postService.addPost(createPostDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok("Delete successful!");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Post> updatePost(@ModelAttribute UpdatePostDTO updatePostDTO, @PathVariable Long id) {
        return postService.updatePost(updatePostDTO, id);
    }

    @PutMapping("/{id}/increment-popularity")
    public ResponseEntity<String> incrementPostPopularity(@PathVariable Long id) {
        postService.incrementPostPopularity(id);
        return ResponseEntity.ok("Implemented!");
    }

    @GetMapping("/sorted-desc-by-popularity")
    public ResponseEntity<List<Post>> getPostsSortedDescByPopularity(@RequestParam(name = "type", defaultValue = "ALL") PostType type) {
        List<Post> sortedPosts = postService.getPostsOrderedDescByPopularityFilteredByType(type);
        return ResponseEntity.ok(sortedPosts);
    }

    @GetMapping("/sorted-asc-by-popularity")
    public ResponseEntity<List<Post>> getPostsSortedAscByPopularity(@RequestParam(name = "type", defaultValue = "ALL") PostType type) {
        List<Post> sortedPosts = postService.getPostsOrderedAscByPopularityFilteredByType(type);
        return ResponseEntity.ok(sortedPosts);
    }

    @GetMapping("/sorted-desc-by-creation-date")
    public ResponseEntity<List<Post>> getPostsSortedDescByCreationDate(@RequestParam(name = "type", defaultValue = "ALL") PostType type) {
        List<Post> sortedPosts = postService.getPostsOrderedDescByCreationDateFilteredByType(type);
        return ResponseEntity.ok(sortedPosts);
    }

    @GetMapping("/sorted-asc-by-creation-date")
    public ResponseEntity<List<Post>> getPostsSortedAscByCreationDate(@RequestParam(name = "type", defaultValue = "ALL") PostType type) {
        List<Post> sortedPosts = postService.getPostsOrderedAscByCreationDateFilteredByType(type);
        return ResponseEntity.ok(sortedPosts);
    }

    @GetMapping("/sorted-desc-by-rating")
    public ResponseEntity<List<Post>> getPostsSortedDescByRating(@RequestParam(name = "type", defaultValue = "ALL") PostType type) {
        List<Post> sortedPosts = postService.getPostsOrderedDescByRatingFilteredByType(type);
        return ResponseEntity.ok(sortedPosts);
    }

    @GetMapping("/sorted-asc-by-rating")
    public ResponseEntity<List<Post>> getPostsSortedAscByRating(@RequestParam(name = "type", defaultValue = "ALL") PostType type) {
        List<Post> sortedPosts = postService.getPostsOrderedAscByRatingFilteredByType(type);
        return ResponseEntity.ok(sortedPosts);
    }

    @GetMapping("/{postId}/average-rating")
    public ResponseEntity<Double> getAverageRatingForPost(@PathVariable Long postId) {
        Double averageRating = postService.getAverageRatingForPost(postId);
        return ResponseEntity.ok(averageRating);
    }
}
