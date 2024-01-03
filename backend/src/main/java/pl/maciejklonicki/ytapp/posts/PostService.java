package pl.maciejklonicki.ytapp.posts;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PostService {
    ResponseEntity<Post> addPost (Post newPost);
    Page<Post> getAllPosts(int page, int size, PostType type, String searchTerm);
    Post getSinglePost (Long id);
    void deletePost(Long id);
    Post updatePost(Post post, Long id);
    void incrementPostPopularity(Long postId);
    List<Post> getPostsOrderedByPopularityFilteredByType(PostType type);
    List<Post> getPostsOrderedByCreationDateFilteredByType(PostType type);
    List<Post> getPostsOrderedByRatingFilteredByType(PostType type);
    Double getAverageRatingForPost(Long postId);
}
