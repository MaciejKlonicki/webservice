package pl.maciejklonicki.ytapp.postrating.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class PostAlreadyRatedAdvice {
    @ResponseBody
    @ExceptionHandler(PostAlreadyRatedException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String postAlreadyRatedHandler(PostAlreadyRatedException ex) {
        return ex.getMessage();
    }
}
