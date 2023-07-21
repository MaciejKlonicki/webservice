package pl.maciejklonicki.ytapp.users.exception;

public class UsersEmailAlreadyExistsException extends RuntimeException {
    public UsersEmailAlreadyExistsException(String email) {
        super("User with this email: " + email + " already exists!");
    }
}
