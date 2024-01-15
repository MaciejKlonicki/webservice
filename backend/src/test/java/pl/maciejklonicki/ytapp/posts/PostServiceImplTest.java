package pl.maciejklonicki.ytapp.posts;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import pl.maciejklonicki.ytapp.posts.dto.CreatePostDTO;
import pl.maciejklonicki.ytapp.posts.dto.GetAllPostsDTO;
import pl.maciejklonicki.ytapp.posts.exception.PostTitleAlreadyExistsException;

import java.awt.print.Pageable;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PostServiceImplTest {

    @Mock
    private PostRepository postRepository;

    @InjectMocks
    private PostServiceImpl postService;

    @Test
    void shouldAddPostSuccessfully() {

        CreatePostDTO createPostDTO = new CreatePostDTO(
                "Test Title",
                "Test Body",
                "Test Author",
                PostType.EDUCATION,
                "2024-01-15T12:00:00.000Z",
                null
        );

        when(postRepository.existsByTitle(anyString())).thenReturn(false);

        ResponseEntity<Post> response = postService.addPost(createPostDTO);

        ArgumentCaptor<Post> postCaptor = ArgumentCaptor.forClass(Post.class);
        verify(postRepository, times(1)).save(postCaptor.capture());

        Post savedPost = postCaptor.getValue();
        assertEquals(createPostDTO.title(), savedPost.getTitle());
        assertEquals(createPostDTO.body(), savedPost.getBody());
        assertEquals(createPostDTO.author(), savedPost.getAuthor());
        assertEquals(createPostDTO.type(), savedPost.getType());
    }

    @Test
    void shouldReturnTitleAlreadyExistsException() {

        CreatePostDTO createPostDTO = new CreatePostDTO(
                "Existing Title",
                "Test Body",
                "Test Author",
                PostType.MUSIC,
                "2024-01-15T12:00:00.000Z",
                null
        );

        when(postRepository.existsByTitle(anyString())).thenReturn(true);

        assertThrows(PostTitleAlreadyExistsException.class, () -> {
            postService.addPost(createPostDTO);
        });

        verify(postRepository, never()).save(any());
    }
}