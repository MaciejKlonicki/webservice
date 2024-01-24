package pl.maciejklonicki.ytapp.postrating;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.maciejklonicki.ytapp.postrating.exception.PostAlreadyRatedException;
import pl.maciejklonicki.ytapp.posts.Post;
import pl.maciejklonicki.ytapp.posts.PostRepository;
import pl.maciejklonicki.ytapp.posts.PostType;
import pl.maciejklonicki.ytapp.users.Role;
import pl.maciejklonicki.ytapp.users.UserRepository;
import pl.maciejklonicki.ytapp.users.Users;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PostRatingServiceImplTest {

    private static final String TEST_USER = "test_user";
    private static final String TEST_EMAIL = "test_email@mail.com";
    private static final String TEST_PASSWORD = "test_password";
    private static final String TEST_MOBILE = "0000000000";
    private static final String TEST_TITLE = "test_title";
    private static final String TEST_BODY = "test_body";
    private static final String TEST_AUTHOR = "test_author";

    @Mock
    private PostRatingRepository postRatingRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PostRepository postRepository;

    @InjectMocks
    private PostRatingServiceImpl postRatingService;

    @Test
    void shouldRatePost() {
        Long postId = 1L;
        int rating = 5;

        Users user = new Users(1L, TEST_USER, TEST_EMAIL, TEST_PASSWORD, TEST_MOBILE, Role.USER, new ArrayList<>(), new ArrayList<>());
        Post post = new Post(1L, TEST_TITLE, TEST_BODY, TEST_AUTHOR, PostType.EDUCATION, new Date(), null, 0, 0, null, null);

        when(userRepository.findByEmail(TEST_EMAIL)).thenReturn(Optional.of(user));
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(postRatingRepository.existsByUserAndPost(user, post)).thenReturn(false);

        assertDoesNotThrow(() -> postRatingService.ratePost(TEST_EMAIL, postId, rating));

        verify(postRatingRepository, times(1)).save(any());

        verify(postRepository, times(1)).save(any());
    }

    @Test
    void shouldReturnPostAlreadyRatedException() {
        Long postId = 1L;
        int rating = 5;

        Users user = new Users(1L, TEST_USER, TEST_EMAIL, TEST_PASSWORD, TEST_MOBILE, Role.USER, new ArrayList<>(), new ArrayList<>());
        Post post = new Post(1L, TEST_TITLE, TEST_BODY, TEST_AUTHOR, PostType.EDUCATION, new Date(), null, 0, 0, null, null);

        when(userRepository.findByEmail(TEST_EMAIL)).thenReturn(Optional.of(user));
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(postRatingRepository.existsByUserAndPost(user, post)).thenReturn(true);

        assertThrows(PostAlreadyRatedException.class, () -> postRatingService.ratePost(TEST_EMAIL, postId, rating));

        verify(postRatingRepository, never()).save(any());

        verify(postRepository, never()).save(any());
    }

    @Test
    void shouldGetRatedPostByUser() {
        Long postId = 1L;

        Users user = new Users(1L, TEST_USER, TEST_EMAIL, TEST_PASSWORD, TEST_MOBILE, Role.USER, new ArrayList<>(), new ArrayList<>());
        Post post = new Post(1L, TEST_TITLE, TEST_BODY, TEST_AUTHOR, PostType.EDUCATION, new Date(), null, 0, 0, null, null);

        when(userRepository.findByEmail(TEST_EMAIL)).thenReturn(Optional.of(user));
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));

        Optional<PostRating> result = postRatingService.getRatedPostByUser(TEST_EMAIL, postId);

        verify(postRatingRepository, times(1)).findByUserAndPost(user, post);

        assertNotNull(result);
        assertFalse(result.isPresent());
    }

    @Test
    void shouldEditPostRating() {
        Long postId = 1L;
        int newRating = 4;

        Users user = new Users(1L, TEST_USER, TEST_EMAIL, TEST_PASSWORD, TEST_MOBILE, Role.USER, new ArrayList<>(), new ArrayList<>());
        Post post = new Post(1L, TEST_TITLE, TEST_BODY, TEST_AUTHOR, PostType.EDUCATION, new Date(), null, 0, 0, null, null);
        PostRating existingRating = new PostRating(1L, user, post, 3);

        when(userRepository.findByEmail(TEST_EMAIL)).thenReturn(Optional.of(user));
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(postRatingRepository.findByUserAndPost(user, post)).thenReturn(Optional.of(existingRating));

        assertDoesNotThrow(() -> postRatingService.editPostRating(TEST_EMAIL, postId, newRating));

        verify(postRatingRepository, times(1)).save(existingRating);

        assertEquals(newRating, existingRating.getRating());
    }
}