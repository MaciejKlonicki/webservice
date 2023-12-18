package pl.maciejklonicki.ytapp.postrating;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/post-ratings")
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
            return ResponseEntity.ok("Success");
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
}
