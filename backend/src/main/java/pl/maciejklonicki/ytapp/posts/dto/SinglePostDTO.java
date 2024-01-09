package pl.maciejklonicki.ytapp.posts.dto;

import pl.maciejklonicki.ytapp.posts.PostType;

public record SinglePostDTO (
    String title,
    String body,
    String author,
    PostType type

) { }
