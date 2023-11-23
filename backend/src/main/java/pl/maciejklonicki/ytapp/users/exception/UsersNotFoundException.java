package pl.maciejklonicki.ytapp.users.exception;

public class UsersNotFoundException extends RuntimeException {
    public UsersNotFoundException(String email) {
        super("Could not find user with ID: " + email);
    }
}
