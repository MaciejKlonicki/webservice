package pl.maciejklonicki.ytapp.postcomment.dto;

public record CommentRequest (String userEmail, Long postId, String comment) { }
