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
    void shouldAddNewPost() {
        Post newPost = new Post();
        when(postRepository.save(any(Post.class))).thenReturn(newPost);
        ResponseEntity<Post> response = postService.addPost(newPost);
        verify(postRepository, times(1)).save(eq(newPost));
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(newPost, response.getBody());
    }

    @Test
    void shouldReturnAllPosts() {
        List<Post> expectedPosts = Arrays.asList(new Post(), new Post());
        when(postRepository.findAll()).thenReturn(expectedPosts);

        List<Post> resultPosts = postService.getAllPosts();

        verify(postRepository, times(1)).findAll();
        assertEquals(expectedPosts, resultPosts);
    }

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

    @Test
    void shouldUpdatePost() {
        Long postID = 1L;
        Post updatedPost = new Post();
        updatedPost.setTitle("Updated Title");
        updatedPost.setBody("Updated Body");
        updatedPost.setAuthor("Updated Author");

        Optional<Post> optionalPost = Optional.of(new Post());
        when(postRepository.findById(eq(postID))).thenReturn(optionalPost);
        when(postRepository.save(any(Post.class))).thenReturn(updatedPost);

        Post resultPost = postService.updatePost(updatedPost, postID);

        verify(postRepository, times(1)).findById(eq(postID));
        verify(postRepository, times(1)).save(any(Post.class));
        assertEquals(updatedPost, resultPost);
        assertEquals("Updated Title", resultPost.getTitle());
        assertEquals("Updated Body", resultPost.getBody());
        assertEquals("Updated Author", resultPost.getAuthor());
    }
}