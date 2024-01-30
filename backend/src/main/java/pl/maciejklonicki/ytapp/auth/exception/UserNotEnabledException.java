package pl.maciejklonicki.ytapp.auth.exception;

public class UserNotEnabledException extends RuntimeException {
    public UserNotEnabledException(String username) {
        super("User: " + username + " hasn't verify email address.");
    }
}
