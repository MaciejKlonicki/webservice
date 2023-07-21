package pl.maciejklonicki.ytapp.users.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class UsersEmailAlreadyExistsAdvice {
    @ResponseBody
    @ExceptionHandler(UsersEmailAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public String usersEmailAlreadyExistsHandler(UsersEmailAlreadyExistsException ex) {
        return ex.getMessage();
    }
}
