package pl.maciejklonicki.ytapp.posts;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import pl.maciejklonicki.ytapp.posts.dto.CreatePostDTO;
import pl.maciejklonicki.ytapp.posts.dto.SinglePostDTO;
import pl.maciejklonicki.ytapp.posts.dto.UpdatePostDTO;

import java.util.List;

public interface PostService {
    ResponseEntity<Post> addPost (CreatePostDTO createPostDTO);
    Page<Post> getAllPosts(int page, int size, PostType type, String searchTerm);
    SinglePostDTO getSinglePostDTO(Long id);
    void deletePost(Long id);
    ResponseEntity<Post> updatePost(UpdatePostDTO updatePostDTO, Long id);
    void incrementPostPopularity(Long postId);
    List<Post> getPostsOrderedByPopularityFilteredByType(PostType type);
    List<Post> getPostsOrderedByCreationDateFilteredByType(PostType type);
    List<Post> getPostsOrderedByRatingFilteredByType(PostType type);
    Double getAverageRatingForPost(Long postId);
}
