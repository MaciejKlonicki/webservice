package pl.maciejklonicki.ytapp.auth.exception;

public class PasswordMismatchException extends RuntimeException {
    public PasswordMismatchException(String password) {
        super("Password are not matching!");
    }
}
