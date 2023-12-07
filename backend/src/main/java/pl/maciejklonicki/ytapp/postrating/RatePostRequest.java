package pl.maciejklonicki.ytapp.postrating;

public record RatePostRequest(String userEmail, Long postId, int rating) {
}
