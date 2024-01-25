package pl.maciejklonicki.ytapp.postrating;

import org.springframework.data.domain.Page;
import pl.maciejklonicki.ytapp.postcomment.dto.GetAllCommentsDTO;

import java.util.Optional;

public interface PostRatingService {
    void ratePost(String userEmail, Long postId, int rating);
    Optional<PostRating> getRatedPostByUser(String userEmail, Long postId);
    void editPostRating(String userEmail, Long postId, int newRating);
    void addCommentToPost(String userEmail, Long postId, String comment);
    Page<GetAllCommentsDTO> getAllCommentsForPost(int page, int size, Long postId);
    void deleteComment(Long commentId, String userEmail);
}
