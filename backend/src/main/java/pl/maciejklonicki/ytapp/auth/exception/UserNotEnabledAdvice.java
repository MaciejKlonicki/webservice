package pl.maciejklonicki.ytapp.auth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class UserNotEnabledAdvice {
    @ResponseBody
    @ExceptionHandler(UserNotEnabledException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public String userNotEnabledHandler(UserNotEnabledException ex) {
        return ex.getMessage();
    }
}
