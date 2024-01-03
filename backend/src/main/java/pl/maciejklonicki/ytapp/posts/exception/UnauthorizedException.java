package pl.maciejklonicki.ytapp.posts.exception;

import pl.maciejklonicki.ytapp.posts.Post;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(Post post, String email) {
        super("User with email: " + email + " cannot edit post: " + post);
    }
}
