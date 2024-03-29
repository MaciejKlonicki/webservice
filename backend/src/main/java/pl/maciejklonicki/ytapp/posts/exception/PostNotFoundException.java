package pl.maciejklonicki.ytapp.posts.exception;


public class PostNotFoundException extends RuntimeException {
    public PostNotFoundException(Long postId) {
        super("Could not find post with ID: " + postId);
    }
}
