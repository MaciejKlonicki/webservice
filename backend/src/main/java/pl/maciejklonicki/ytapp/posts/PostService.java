package pl.maciejklonicki.ytapp.posts;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PostService {
    ResponseEntity<Post> addPost (Post newPost);
    Page<Post> getAllPosts(int page, int size, String type, String searchTerm);
    Post getSinglePost (Long id);
    void deletePost(Long id);
    Post updatePost(Post post, Long id);
    void incrementPostPopularity(Long postId);
    List<Post> getPostsOrderedByPopularityFilteredByType(String type);
    List<Post> getPostsOrderedByCreationDateFilteredByType(String type);
    List<Post> getPostsOrderedByRatingFilteredByType(String type);
    Double getAverageRatingForPost(Long postId);
}
