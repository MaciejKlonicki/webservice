package pl.maciejklonicki.ytapp.posts.exception;

public class PostTitleAlreadyExistsException extends RuntimeException {
    public PostTitleAlreadyExistsException(String title) {
        super("Post with title: " + title + " already exists!");
    }
}
