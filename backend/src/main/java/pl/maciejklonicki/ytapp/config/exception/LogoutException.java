package pl.maciejklonicki.ytapp.config.exception;

public class LogoutException extends RuntimeException {
    public LogoutException(String message) {
        super("Logout successful!");
    }
}
