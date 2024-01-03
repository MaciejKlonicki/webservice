package pl.maciejklonicki.ytapp.posts.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class CreatePostDTO {

    private String title;
    private String body;
    private String author;
    private String type;
    private String creationDate;
    private MultipartFile photo;
}
