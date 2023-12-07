package pl.maciejklonicki.ytapp.postrating;

import lombok.Getter;
import lombok.Setter;

public record RatePostRequest(String userEmail, Long postId, int rating) {
}
