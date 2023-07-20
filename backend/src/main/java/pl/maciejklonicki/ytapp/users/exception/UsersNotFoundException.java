package pl.maciejklonicki.ytapp.users.exception;

public class UsersNotFoundException extends RuntimeException {
    public UsersNotFoundException(Long usersId) {
        super("Could not find user with ID: " + usersId);
    }
}
