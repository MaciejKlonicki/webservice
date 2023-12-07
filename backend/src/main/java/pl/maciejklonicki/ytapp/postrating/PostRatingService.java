package pl.maciejklonicki.ytapp.postrating;

public interface PostRatingService {
    void ratePost(String userEmail, Long postId, int rating);
}
