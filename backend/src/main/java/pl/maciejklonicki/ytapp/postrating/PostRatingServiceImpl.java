package pl.maciejklonicki.ytapp.postrating;

import org.springframework.stereotype.Service;
import pl.maciejklonicki.ytapp.postrating.exception.PostAlreadyRatedException;
import pl.maciejklonicki.ytapp.posts.Post;
import pl.maciejklonicki.ytapp.posts.PostRepository;
import pl.maciejklonicki.ytapp.posts.exception.PostNotFoundException;
import pl.maciejklonicki.ytapp.users.UserRepository;
import pl.maciejklonicki.ytapp.users.Users;
import pl.maciejklonicki.ytapp.users.exception.UsersNotFoundException;

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
        Users users = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsersNotFoundException("User with this email: " + userEmail + "has not been found!"));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(postId));

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
}
