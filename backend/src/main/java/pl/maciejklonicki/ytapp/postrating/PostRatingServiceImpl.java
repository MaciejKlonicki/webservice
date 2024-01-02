package pl.maciejklonicki.ytapp.postrating;

import org.springframework.stereotype.Service;
import pl.maciejklonicki.ytapp.postrating.exception.PostAlreadyRatedException;
import pl.maciejklonicki.ytapp.postrating.exception.PostRatingNotFoundException;
import pl.maciejklonicki.ytapp.posts.Post;
import pl.maciejklonicki.ytapp.posts.PostRepository;
import pl.maciejklonicki.ytapp.posts.exception.PostNotFoundException;
import pl.maciejklonicki.ytapp.users.UserRepository;
import pl.maciejklonicki.ytapp.users.Users;
import pl.maciejklonicki.ytapp.users.exception.UsersNotFoundException;

import java.util.Optional;

@Service
public class PostRatingServiceImpl implements PostRatingService {

    private final PostRatingRepository postRatingRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public PostRatingServiceImpl(PostRatingRepository postRatingRepository, UserRepository userRepository, PostRepository postRepository) {
        this.postRatingRepository = postRatingRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @Override
    public void ratePost(String userEmail, Long postId, int rating) {
        Users users = getUserByEmail(userEmail);
        Post post = getPostById(postId);

        if (postRatingRepository.existsByUserAndPost(users, post)) {
            throw new PostAlreadyRatedException(postId);
        }

        PostRating postRating = new PostRating();
        postRating.setUser(users);
        postRating.setPost(post);
        postRating.setRating(rating);

        postRatingRepository.save(postRating);

        post.setTotalRatings(post.getTotalRatings() + 1);
        postRepository.save(post);
    }

    @Override
    public Optional<PostRating> getRatedPostByUser(String userEmail, Long postId) {
        Users user = getUserByEmail(userEmail);
        Post post = getPostById(postId);

        return postRatingRepository.findByUserAndPost(user, post);
    }

    @Override
    public void editPostRating(String userEmail, Long postId, int newRating) {
        Users user = getUserByEmail(userEmail);
        Post post = getPostById(postId);

        PostRating existingRating = postRatingRepository.findByUserAndPost(user, post)
                .orElseThrow(() -> new PostRatingNotFoundException(userEmail, postId));

        existingRating.setRating(newRating);
        postRatingRepository.save(existingRating);
    }

    private Users getUserByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsersNotFoundException("User with this email: " + userEmail + " has not been found!"));
    }

    private Post getPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(postId));
    }
}
