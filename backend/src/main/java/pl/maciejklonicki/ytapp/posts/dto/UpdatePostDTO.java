package pl.maciejklonicki.ytapp.posts.dto;

import pl.maciejklonicki.ytapp.posts.PostType;

public record UpdatePostDTO (
      String title,
      String body,
      PostType type
) { }
