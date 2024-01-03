package pl.maciejklonicki.ytapp.posts.dto;

import org.springframework.web.multipart.MultipartFile;
import pl.maciejklonicki.ytapp.posts.PostType;

public record CreatePostDTO(
        String title,
        String body,
        String author,
        PostType type,
        String creationDate,
        MultipartFile photo
) { }
