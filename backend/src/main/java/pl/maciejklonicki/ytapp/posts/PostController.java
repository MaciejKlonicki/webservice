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

    @PostMapping
    public ResponseEntity<Post> addPost(@ModelAttribute CreatePostDTO createPostDTO) {
        if (createPostDTO.photo() != null && createPostDTO.photo().getSize() > 1024 * 1024) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return postService.addPost(createPostDTO);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Post> updatePost(@ModelAttribute UpdatePostDTO updatePostDTO, @PathVariable Long id) {
        return postService.updatePost(updatePostDTO, id);
    }

    @PutMapping("/{id}/increment-popularity")
    public ResponseEntity<Void> incrementPostPopularity(@PathVariable Long id) {
        postService.incrementPostPopularity(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/sorted-by-popularity")
    public ResponseEntity<List<Post>> getPostsSortedByPopularity(@RequestParam(name = "type", defaultValue = "All") PostType type) {
        List<Post> sortedPosts = postService.getPostsOrderedByPopularityFilteredByType(type);
        return ResponseEntity.ok(sortedPosts);
    }

    @GetMapping("/sorted-by-creation-date")
    public ResponseEntity<List<Post>> getPostsSortedByCreationDate(@RequestParam(name = "type", defaultValue = "All") PostType type) {
        List<Post> sortedPosts = postService.getPostsOrderedByCreationDateFilteredByType(type);
        return ResponseEntity.ok(sortedPosts);
    }

    @GetMapping("/sorted-by-rating")
    public ResponseEntity<List<Post>> getPostsSortedByRating(@RequestParam(name = "type", defaultValue = "All") PostType type) {
        List<Post> sortedPosts = postService.getPostsOrderedByRatingFilteredByType(type);
        return ResponseEntity.ok(sortedPosts);
    }

    @GetMapping("/{postId}/average-rating")
    public ResponseEntity<Double> getAverageRatingForPost(@PathVariable Long postId) {
        Double averageRating = postService.getAverageRatingForPost(postId);
        return ResponseEntity.ok(averageRating);
    }
}
