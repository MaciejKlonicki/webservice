package pl.maciejklonicki.ytapp.posts;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import pl.maciejklonicki.ytapp.postrating.PostRating;
import pl.maciejklonicki.ytapp.posts.dto.CreatePostDTO;
import pl.maciejklonicki.ytapp.posts.dto.GetAllPostsDTO;
import pl.maciejklonicki.ytapp.posts.dto.SinglePostDTO;
import pl.maciejklonicki.ytapp.posts.dto.UpdatePostDTO;
import pl.maciejklonicki.ytapp.posts.exception.PostNotFoundException;
import pl.maciejklonicki.ytapp.posts.exception.PostTitleAlreadyExistsException;
import pl.maciejklonicki.ytapp.users.Users;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PostServiceImplTest {

    private static final String TEST_TITLE = "test_title";
    private static final String TEST_BODY = "test_body";
    private static final String TEST_AUTHOR = "test_author";


    @Mock
    private PostRepository postRepository;

    @InjectMocks
    private PostServiceImpl postService;

    @Test
    void shouldAddPostSuccessfully() {
        CreatePostDTO createPostDTO = new CreatePostDTO(
                TEST_TITLE,
                TEST_BODY,
                TEST_AUTHOR,
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
                TEST_TITLE,
                TEST_BODY,
                TEST_AUTHOR,
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
                TEST_TITLE,
                TEST_BODY,
                TEST_AUTHOR,
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
                TEST_TITLE,
                TEST_BODY,
                TEST_AUTHOR,
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

    @Test
    @Transactional
    void shouldIncrementPostPopularity() {
        Long postId = 1L;

        Post existingPost = new Post(
                postId,
                TEST_TITLE,
                TEST_BODY,
                TEST_AUTHOR,
                PostType.OTHER,
                new Date(),
                null,
                0,
                0,
                new ArrayList<>()
        );

        when(postRepository.findById(postId)).thenReturn(java.util.Optional.of(existingPost));
        when(postRepository.save(any())).thenReturn(existingPost);

        postService.incrementPostPopularity(postId);

        verify(postRepository, times(1)).findById(postId);
        assertEquals(1, existingPost.getPopularity());
        verify(postRepository, times(1)).save(existingPost);
    }

    @Test
    @Transactional(readOnly = true)
    void  shouldOrderPostsByPopularityIncludingTypes() {
        PostType filterType = PostType.EDUCATION;

        Post post1 = new Post(1L, TEST_TITLE, TEST_BODY, TEST_AUTHOR, PostType.EDUCATION, new Date(), null, 3, 0, null);
        Post post2 = new Post(2L, TEST_TITLE + "2", TEST_BODY + "2", TEST_AUTHOR + "2", PostType.EDUCATION, new Date(), null, 5, 0, null);
        Post post3 = new Post(3L, TEST_TITLE + "3", TEST_BODY + "3", TEST_AUTHOR + "3", PostType.EDUCATION, new Date(), null, 2, 0, null);

        when(postRepository.findByTypeOrderByPopularityDesc(filterType)).thenReturn(Arrays.asList(post2, post1, post3));

        List<Post> result = postService.getPostsOrderedDescByPopularityFilteredByType(filterType);

        verify(postRepository, times(1)).findByTypeOrderByPopularityDesc(filterType);

        assertNotNull(result);
        assertEquals(3, result.size());
        assertEquals(post2, result.get(0));
        assertEquals(post1, result.get(1));
        assertEquals(post3, result.get(2));
    }

    @Test
    @Transactional(readOnly = true)
    void shouldOrderPostsByPopularityWithFilterALL() {
        PostType filterType = PostType.ALL;

        Post post1 = new Post(1L, TEST_TITLE, TEST_BODY, TEST_AUTHOR, PostType.EDUCATION, new Date(), null, 3, 0, null);
        Post post2 = new Post(2L, TEST_TITLE + "2", TEST_BODY + "2", TEST_AUTHOR + "2", PostType.EDUCATION, new Date(), null, 5, 0, null);
        Post post3 = new Post(3L, TEST_TITLE + "3", TEST_BODY + "3", TEST_AUTHOR + "3", PostType.EDUCATION, new Date(), null, 2, 0, null);

        when(postRepository.findAllByOrderByPopularityDesc()).thenReturn(Arrays.asList(post2, post1, post3));

        List<Post> result = postService.getPostsOrderedDescByPopularityFilteredByType(filterType);

        verify(postRepository, times(1)).findAllByOrderByPopularityDesc();

        assertNotNull(result);
        assertEquals(3, result.size());
        assertEquals(post2, result.get(0));
        assertEquals(post1, result.get(1));
        assertEquals(post3, result.get(2));
    }

    @Test
    @Transactional(readOnly = true)
    void shouldOrderPostsByCreationDateIncludingTypes() {
        PostType filterType = PostType.MUSIC;

        Post post1 = new Post(1L, TEST_TITLE, TEST_BODY, TEST_AUTHOR, PostType.EDUCATION, new Date(), null, 3, 0, null);
        Post post2 = new Post(2L, TEST_TITLE + "2", TEST_BODY + "2", TEST_AUTHOR + "2", PostType.EDUCATION, new Date(), null, 5, 0, null);
        Post post3 = new Post(3L, TEST_TITLE + "3", TEST_BODY + "3", TEST_AUTHOR + "3", PostType.EDUCATION, new Date(), null, 2, 0, null);

        when(postRepository.findByTypeOrderByCreationDateDesc(filterType)).thenReturn(Arrays.asList(post2, post1, post3));

        List<Post> result = postService.getPostsOrderedByCreationDateFilteredByType(filterType);
        verify(postRepository, times(1)).findByTypeOrderByCreationDateDesc(filterType);

        assertNotNull(result);
        assertEquals(3, result.size());
        assertEquals(post2, result.get(0));
        assertEquals(post1, result.get(1));
        assertEquals(post3, result.get(2));
    }

    @Test
    @Transactional(readOnly = true)
    void shouldOrderPostsByCreationDateWithFilterALL() {
        PostType filterType = PostType.ALL;

        Post post1 = new Post(1L, TEST_TITLE, TEST_BODY, TEST_AUTHOR, PostType.EDUCATION, new Date(), null, 3, 0, null);
        Post post2 = new Post(2L, TEST_TITLE + "2", TEST_BODY + "2", TEST_AUTHOR + "2", PostType.EDUCATION, new Date(), null, 5, 0, null);
        Post post3 = new Post(3L, TEST_TITLE + "3", TEST_BODY + "3", TEST_AUTHOR + "3", PostType.EDUCATION, new Date(), null, 2, 0, null);

        when(postRepository.findAllByOrderByCreationDateDesc()).thenReturn(Arrays.asList(post2, post1, post3));

        List<Post> result = postService.getPostsOrderedByCreationDateFilteredByType(filterType);

        verify(postRepository, times(1)).findAllByOrderByCreationDateDesc();

        assertNotNull(result);
        assertEquals(3, result.size());
        assertEquals(post2, result.get(0));
        assertEquals(post1, result.get(1));
        assertEquals(post3, result.get(2));
    }

    @Test
    @Transactional(readOnly = true)
    void shouldOrderPostsByRatingIncludingTypes() {
        PostType filterType = PostType.MUSIC;

        Post post1 = new Post(1L, TEST_TITLE, TEST_BODY, TEST_AUTHOR, PostType.EDUCATION, new Date(), null, 3, 0, null);
        Post post2 = new Post(2L, TEST_TITLE + "2", TEST_BODY + "2", TEST_AUTHOR + "2", PostType.EDUCATION, new Date(), null, 5, 0, null);
        Post post3 = new Post(3L, TEST_TITLE + "3", TEST_BODY + "3", TEST_AUTHOR + "3", PostType.EDUCATION, new Date(), null, 2, 0, null);

        when(postRepository.findByTypeOrderByAverageRatingDesc(filterType)).thenReturn(Arrays.asList(post2, post1, post3));
        List<Post> result = postService.getPostsOrderedByRatingFilteredByType(filterType);
        verify(postRepository, times(1)).findByTypeOrderByAverageRatingDesc(filterType);

        assertNotNull(result);
        assertEquals(3, result.size());
        assertEquals(post2, result.get(0));
        assertEquals(post1, result.get(1));
        assertEquals(post3, result.get(2));
    }

    @Test
    @Transactional(readOnly = true)
    void shouldOrderPostsByRatingWithFilterALL() {
        PostType filterType = PostType.ALL;

        Post post1 = new Post(1L, TEST_TITLE, TEST_BODY, TEST_AUTHOR, PostType.EDUCATION, new Date(), null, 3, 0, null);
        Post post2 = new Post(2L, TEST_TITLE + "2", TEST_BODY + "2", TEST_AUTHOR + "2", PostType.EDUCATION, new Date(), null, 5, 0, null);
        Post post3 = new Post(3L, TEST_TITLE + "3", TEST_BODY + "3", TEST_AUTHOR + "3", PostType.EDUCATION, new Date(), null, 2, 0, null);

        when(postRepository.findAllByOrderByAverageRatingDesc()).thenReturn(Arrays.asList(post2, post1, post3));

        List<Post> result = postService.getPostsOrderedByRatingFilteredByType(filterType);
        verify(postRepository, times(1)).findAllByOrderByAverageRatingDesc();

        assertNotNull(result);
        assertEquals(3, result.size());
        assertEquals(post2, result.get(0));
        assertEquals(post1, result.get(1));
        assertEquals(post3, result.get(2));
    }

    @Test
    @Transactional(readOnly = true)
    void shouldReturnAverageRatingForPost() {
        Long postId = 1L;

        Post postNoRatings = new Post(
                postId,
                TEST_TITLE,
                TEST_BODY,
                TEST_AUTHOR,
                PostType.EDUCATION,
                new Date(),
                null,
                0,
                0,
                new ArrayList<>()
        );

        Post postWithRatings = new Post(
                postId,
                TEST_TITLE,
                TEST_BODY,
                TEST_AUTHOR,
                PostType.EDUCATION,
                new Date(),
                null,
                0,
                0,
                Arrays.asList(
                        new PostRating(1L, new Users(), postNoRatings, 5),
                        new PostRating(2L, new Users(), postNoRatings, 3),
                        new PostRating(3L, new Users(), postNoRatings, 4)
                )
        );

        when(postRepository.findById(postId)).thenReturn(java.util.Optional.of(postNoRatings), java.util.Optional.of(postWithRatings));

        Double averageRatingNoRatings = postService.getAverageRatingForPost(postId);
        Double averageRatingWithRatings = postService.getAverageRatingForPost(postId);

        verify(postRepository, times(2)).findById(postId);

        assertEquals(0.0, averageRatingNoRatings, 0.001);
        assertEquals(4.0, averageRatingWithRatings, 0.001);
    }

    @Test
    void shouldReturnAllPosts() {
        int page = 0;
        int size = 10;
        PostType type = null;
        String searchTerm = null;

        List<Post> posts = Arrays.asList(
                new Post(1L, TEST_TITLE, TEST_BODY, TEST_AUTHOR, PostType.EDUCATION, new Date(), null, 3, 0, null),
                new Post(2L, TEST_TITLE + "2", TEST_BODY + "2", TEST_AUTHOR + "2", PostType.EDUCATION, new Date(), null, 5, 0, null),
                new Post(3L, TEST_TITLE + "3", TEST_BODY + "3", TEST_AUTHOR + "3", PostType.EDUCATION, new Date(), null, 2, 0, null)
        );

        Page<Post> pageResult = new PageImpl<>(posts);

        when(postRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(pageResult);

        Page<GetAllPostsDTO> result = postService.getAllPosts(page, size, type, searchTerm);

        verify(postRepository, times(1)).findAll(any(Specification.class), any(Pageable.class));

        assertNotNull(result);
        assertEquals(3, result.getContent().size());
    }

    @Test
    void shouldReturnAllPostsByType() {
        int page = 0;
        int size = 10;
        PostType type = PostType.SPORT;
        String searchTerm = null;

        List<Post> posts = Arrays.asList(
                new Post(1L, TEST_TITLE, TEST_BODY, TEST_AUTHOR, PostType.EDUCATION, new Date(), null, 3, 0, null),
                new Post(2L, TEST_TITLE + "2", TEST_BODY + "2", TEST_AUTHOR + "2", PostType.EDUCATION, new Date(), null, 5, 0, null),
                new Post(3L, TEST_TITLE + "3", TEST_BODY + "3", TEST_AUTHOR + "3", PostType.EDUCATION, new Date(), null, 2, 0, null)
        );

        Page<Post> pageResult = new PageImpl<>(posts);

        when(postRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(pageResult);

        Page<GetAllPostsDTO> result = postService.getAllPosts(page, size, type, searchTerm);

        verify(postRepository, times(1)).findAll(any(Specification.class), any(Pageable.class));

        assertNotNull(result);
        assertEquals(3, result.getContent().size());
    }

    @Test
    void shouldReturnAllPostsBySearchTerm() {
        int page = 0;
        int size = 10;
        PostType type = null;
        String searchTerm = "title";

        List<Post> posts = Arrays.asList(
                new Post(1L, TEST_TITLE, TEST_BODY, TEST_AUTHOR, PostType.EDUCATION, new Date(), null, 3, 0, null),
                new Post(2L, TEST_TITLE + "2", TEST_BODY + "2", TEST_AUTHOR + "2", PostType.EDUCATION, new Date(), null, 5, 0, null),
                new Post(3L, TEST_TITLE + "3", TEST_BODY + "3", TEST_AUTHOR + "3", PostType.EDUCATION, new Date(), null, 2, 0, null)
        );

        Page<Post> pageResult = new PageImpl<>(posts);

        when(postRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(pageResult);

        Page<GetAllPostsDTO> result = postService.getAllPosts(page, size, type, searchTerm);

        verify(postRepository, times(1)).findAll(any(Specification.class), any(Pageable.class));

        assertNotNull(result);
        assertEquals(3, result.getContent().size());
    }
}