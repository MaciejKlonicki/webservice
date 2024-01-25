package pl.maciejklonicki.ytapp.postcomment.exception;

public class UnauthorizedUserToDeleteCommentException extends RuntimeException {
    public UnauthorizedUserToDeleteCommentException(String userEmail) {
        super("User: " + userEmail + "has no authority to delete this comment!");
    }
}
