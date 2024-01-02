package pl.maciejklonicki.ytapp.postrating.dto;

public record EditPostRatingRequest(
        String userEmail,
        Long postId,
        int newRating
) {}
