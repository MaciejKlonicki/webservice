package pl.maciejklonicki.ytapp.postrating.exception;

public class PostAlreadyRatedException extends RuntimeException {
    public PostAlreadyRatedException(Long postId) {
        super("Post with ID: " + postId + " has been already rated!");
    }
}