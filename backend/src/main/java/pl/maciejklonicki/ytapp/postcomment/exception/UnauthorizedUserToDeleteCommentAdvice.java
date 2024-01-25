package pl.maciejklonicki.ytapp.postcomment.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class UnauthorizedUserToDeleteCommentAdvice {
    @ResponseBody
    @ExceptionHandler(UnauthorizedUserToDeleteCommentException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public String unautorizedUserToDeleteCommentHandler(UnauthorizedUserToDeleteCommentException ex) {
        return ex.getMessage();
    }
}
