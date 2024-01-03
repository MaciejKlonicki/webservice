package pl.maciejklonicki.ytapp.posts;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
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
    void shouldReturnSinglePostWithSpecificID() {
        Long postID = 1L;
        Post expectedPost = new Post();
        when(postRepository.findById(postID)).thenReturn(Optional.of(expectedPost));

        Post singlePost = postService.getSinglePost(postID);
        verify(postRepository, times(1)).findById(eq(postID));
        assertEquals(expectedPost, singlePost);
    }

    @Test
    void shouldDeletePost() {
        Long postID = 1L;
        postService.deletePost(postID);
        verify(postRepository, times(1)).deleteById(postID);
    }
}