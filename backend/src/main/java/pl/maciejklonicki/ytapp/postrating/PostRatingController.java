package pl.maciejklonicki.ytapp.postrating;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.maciejklonicki.ytapp.postcomment.PostComment;
import pl.maciejklonicki.ytapp.postcomment.dto.CommentRequest;
import pl.maciejklonicki.ytapp.postcomment.dto.EditCommentRequest;
import pl.maciejklonicki.ytapp.postcomment.dto.GetAllCommentsDTO;
import pl.maciejklonicki.ytapp.postrating.dto.EditPostRatingRequest;
import pl.maciejklonicki.ytapp.postrating.dto.RatePostRequest;

@RestController
@RequestMapping("/api/v1/post-ratings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PostRatingController {

    private final PostRatingService postRatingService;

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

    @GetMapping("/get-comments")
    public ResponseEntity<Page<GetAllCommentsDTO>> getAllCommentsForPost(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam Long postId
    ) {
        Page<GetAllCommentsDTO> commentsDTOS = postRatingService.getAllCommentsForPost(page, size, postId);
        return new ResponseEntity<>(commentsDTOS, HttpStatus.OK);
    }

    @DeleteMapping("/delete-comment/{commentId}")
    public ResponseEntity<String> deleteComment(
            @PathVariable Long commentId,
            @RequestParam String userEmail
    ) {
        try {
            postRatingService.deleteComment(commentId, userEmail);
            return ResponseEntity.ok("Comment deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/edit-comment/{commentId}")
    public ResponseEntity<String> editComment(
            @PathVariable Long commentId,
            @RequestBody EditCommentRequest editCommentRequest
    ) {
        try {
            postRatingService.editComment(commentId, editCommentRequest.userEmail(), editCommentRequest.editedComment());
            return ResponseEntity.ok("Comment edited successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
