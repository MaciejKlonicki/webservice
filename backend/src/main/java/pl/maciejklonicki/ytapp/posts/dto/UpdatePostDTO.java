package pl.maciejklonicki.ytapp.posts.dto;

import org.springframework.web.multipart.MultipartFile;
import pl.maciejklonicki.ytapp.posts.PostType;

public record UpdatePostDTO (
      String title,
      String body,
      PostType type
) { }
