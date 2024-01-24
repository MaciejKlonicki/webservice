package pl.maciejklonicki.ytapp.postrating.exception;

public class PostAlreadyCommentedException extends RuntimeException {
    public PostAlreadyCommentedException(Long postId) {
        super("Post with ID: " + postId + " has been already commented!");
    }
}
