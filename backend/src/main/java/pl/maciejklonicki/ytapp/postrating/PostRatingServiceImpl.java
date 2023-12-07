package pl.maciejklonicki.ytapp.postrating;

import org.springframework.stereotype.Service;
import pl.maciejklonicki.ytapp.posts.Post;
import pl.maciejklonicki.ytapp.posts.PostRepository;
import pl.maciejklonicki.ytapp.users.UserRepository;
import pl.maciejklonicki.ytapp.users.Users;

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
                .orElseThrow(() -> new RuntimeException("User with this ID exists!"));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post with this ID exists!"));

        if (postRatingRepository.existsByUserAndPost(users, post)) {
            throw new RuntimeException("User already starred this post!");
        }

        PostRating postRating = new PostRating();
        postRating.setUser(users);
        postRating.setPost(post);
        postRating.setRating(rating);

        postRatingRepository.save(postRating);
    }
}
