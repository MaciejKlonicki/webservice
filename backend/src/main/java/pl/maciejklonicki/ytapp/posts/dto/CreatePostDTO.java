package pl.maciejklonicki.ytapp.posts.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import pl.maciejklonicki.ytapp.posts.PostType;

@Getter
@Setter
public class CreatePostDTO {

    private String title;
    private String body;
    private String author;
    private PostType type;
    private String creationDate;
    private MultipartFile photo;
}
