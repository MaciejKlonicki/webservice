package pl.maciejklonicki.ytapp.postrating;

import java.util.Optional;

public interface PostRatingService {
    void ratePost(String userEmail, Long postId, int rating);
    Optional<PostRating> getRatedPostByUser(String userEmail, Long postId);
}
