package pl.maciejklonicki.ytapp.postrating;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.maciejklonicki.ytapp.postcomment.dto.CommentRequest;
import pl.maciejklonicki.ytapp.postrating.dto.EditPostRatingRequest;
import pl.maciejklonicki.ytapp.postrating.dto.RatePostRequest;

@RestController
@RequestMapping("/api/v1/post-ratings")
@CrossOrigin(origins = "http://localhost:3000")
public class PostRatingController {
    private final PostRatingService postRatingService;

    public PostRatingController(PostRatingService postRatingService) {
        this.postRatingService = postRatingService;
    }

    @PostMapping("/rate")
    public ResponseEntity<String> ratePost(@RequestBody RatePostRequest ratePostRequest) {
        try {
            postRatingService.ratePost(ratePostRequest.userEmail(), ratePostRequest.postId(), ratePostRequest.rating());
            return ResponseEntity.ok("You rated post successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get-rating")
    public Object getRatingByUserAndPost(@RequestParam String userEmail, @RequestParam Long postId) {
        try {
            return postRatingService.getRatedPostByUser(userEmail, postId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/edit-rating")
    public ResponseEntity<String> editPostRating(@RequestBody EditPostRatingRequest editPostRatingRequest) {
        try {
            postRatingService.editPostRating(editPostRatingRequest.userEmail(), editPostRatingRequest.postId(), editPostRatingRequest.newRating());
            return ResponseEntity.ok("You have changed the rate of the post successfuly!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/add-comment")
    public ResponseEntity<String> addCommentToPost(@RequestBody CommentRequest addCommentRequest) {
        try {
            postRatingService.addCommentToPost(addCommentRequest.userEmail(), addCommentRequest.postId(), addCommentRequest.comment());
            return ResponseEntity.ok("Comment added successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
