package pl.maciejklonicki.ytapp.postrating.dto;

public record RatePostRequest(String userEmail, Long postId, int rating) {
}
