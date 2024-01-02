package pl.maciejklonicki.ytapp.postrating.exception;

public class PostRatingNotFoundException extends RuntimeException {
    public PostRatingNotFoundException(String userEmail, Long postId) {
        super("User with email : " + userEmail + "has not rated post: " + postId);
    }
}
