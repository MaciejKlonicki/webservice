package pl.maciejklonicki.ytapp.postrating.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class PostAlreadyCommentedAdvice {
    @ResponseBody
    @ExceptionHandler(PostAlreadyCommentedException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public String postAlreadyCommentedHandler(PostAlreadyCommentedException ex) {
        return ex.getMessage();
    }
}
