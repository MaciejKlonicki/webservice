package pl.maciejklonicki.ytapp.postrating;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import pl.maciejklonicki.ytapp.postcomment.PostComment;
import pl.maciejklonicki.ytapp.postcomment.PostCommentRepository;
import pl.maciejklonicki.ytapp.postcomment.dto.GetAllCommentsDTO;
import pl.maciejklonicki.ytapp.postrating.exception.PostAlreadyRatedException;
import pl.maciejklonicki.ytapp.postrating.exception.PostRatingNotFoundException;
import pl.maciejklonicki.ytapp.posts.Post;
import pl.maciejklonicki.ytapp.posts.PostRepository;
import pl.maciejklonicki.ytapp.posts.dto.GetAllPostsDTO;
import pl.maciejklonicki.ytapp.posts.exception.PostNotFoundException;
import pl.maciejklonicki.ytapp.users.UserRepository;
import pl.maciejklonicki.ytapp.users.Users;
import pl.maciejklonicki.ytapp.users.exception.UsersNotFoundException;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostRatingServiceImpl implements PostRatingService {

    private final PostRatingRepository postRatingRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final PostCommentRepository postCommentRepository;

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

    @Override
    public void addCommentToPost(String userEmail, Long postId, String comment) {
        Users user = getUserByEmail(userEmail);
        Post post = getPostById(postId);

        PostComment postComment = new PostComment();
        postComment.setUser(user);
        postComment.setPost(post);
        postComment.setComment(comment);

        if (post.getComments() == null) {
            post.setComments(new ArrayList<>());
        }

        post.getComments().add(postComment);
        postRepository.save(post);
    }

    @Override
    public Page<GetAllCommentsDTO> getAllCommentsForPost(int page, int size, Long postId) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<PostComment> spec = Specification.where((root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("post").get("id"), postId));

        Page<PostComment> postComments = postCommentRepository.findAll(spec, pageable);

        return postComments.map(post -> new GetAllCommentsDTO(
                post.getComment(),
                post.getUser().getUsername()
        ));
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
