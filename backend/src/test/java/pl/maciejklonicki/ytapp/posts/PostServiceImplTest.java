package pl.maciejklonicki.ytapp.posts;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import pl.maciejklonicki.ytapp.posts.dto.CreatePostDTO;
import pl.maciejklonicki.ytapp.posts.dto.SinglePostDTO;
import pl.maciejklonicki.ytapp.posts.dto.UpdatePostDTO;
import pl.maciejklonicki.ytapp.posts.exception.PostNotFoundException;
import pl.maciejklonicki.ytapp.posts.exception.PostTitleAlreadyExistsException;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
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

    @Test
    void shouldReturnSinglePost() {
        Long postId = 1L;
        Post post = new Post(
                postId,
                "Test Title",
                "Test Body",
                "Test Author",
                PostType.EDUCATION,
                new Date(),
                null,
                0,
                0,
                new ArrayList<>()
        );

        when(postRepository.findById(postId)).thenReturn(java.util.Optional.of(post));

        SinglePostDTO singlePostDTO = postService.getSinglePostDTO(postId);

        verify(postRepository, times(1)).findById(postId);

        assertNotNull(singlePostDTO);
        assertEquals(post.getTitle(), singlePostDTO.title());
        assertEquals(post.getBody(), singlePostDTO.body());
        assertEquals(post.getAuthor(), singlePostDTO.author());
        assertEquals(post.getType(), singlePostDTO.type());
    }

    @Test
    void shouldDeletePost() {
        Long postId = 1L;

        postService.deletePost(postId);

        verify(postRepository, times(1)).deleteById(postId);
    }

    @Test
    void shouldUpdatePost() {
        Long postId = 1L;
        UpdatePostDTO updatePostDTO = new UpdatePostDTO("Updated Title", "Updated Body", PostType.EDUCATION);

        Post existingPost = new Post(
                postId,
                "Old Title",
                "Old Body",
                "Old Author",
                PostType.EDUCATION,
                new Date(),
                null,
                0,
                0,
                new ArrayList<>()
        );

        when(postRepository.findById(postId)).thenReturn(java.util.Optional.of(existingPost));
        when(postRepository.save(any())).thenReturn(existingPost);

        ResponseEntity<Post> response = postService.updatePost(updatePostDTO, postId);

        verify(postRepository, times(1)).findById(postId);

        assertNotNull(response.getBody());
        assertEquals(updatePostDTO.title(), response.getBody().getTitle());
        assertEquals(updatePostDTO.body(), response.getBody().getBody());
        assertEquals(updatePostDTO.type(), response.getBody().getType());

        verify(postRepository, times(1)).save(existingPost);
    }

    @Test
    void shouldReturnPostNotFoundException() {
        Long postId = 1L;
        UpdatePostDTO updatePostDTO = new UpdatePostDTO("Updated Title", "Updated Body", PostType.MUSIC);

        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        assertThrows(PostNotFoundException.class, () -> postService.updatePost(updatePostDTO, postId));

        verify(postRepository, never()).save(any());
    }
}