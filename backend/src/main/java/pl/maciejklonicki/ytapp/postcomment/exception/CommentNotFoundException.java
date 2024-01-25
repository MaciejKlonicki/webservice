package pl.maciejklonicki.ytapp.postcomment.exception;

public class CommentNotFoundException extends RuntimeException {
    public CommentNotFoundException(Long commentId) {
        super("Comment with ID: " + commentId + " has not been found!");
    }
}
