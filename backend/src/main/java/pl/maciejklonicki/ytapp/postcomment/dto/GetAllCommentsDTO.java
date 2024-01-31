package pl.maciejklonicki.ytapp.postcomment.dto;

import java.time.LocalDateTime;

public record GetAllCommentsDTO (Long commentId, String comment, String username, LocalDateTime creationDate) { }
