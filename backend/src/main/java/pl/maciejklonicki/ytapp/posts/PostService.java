package pl.maciejklonicki.ytapp.posts;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import pl.maciejklonicki.ytapp.posts.dto.CreatePostDTO;
import pl.maciejklonicki.ytapp.posts.dto.GetAllPostsDTO;
import pl.maciejklonicki.ytapp.posts.dto.SinglePostDTO;
import pl.maciejklonicki.ytapp.posts.dto.UpdatePostDTO;

import java.util.List;

public interface PostService {
    ResponseEntity<Post> addPost (CreatePostDTO createPostDTO);
    Page<GetAllPostsDTO> getAllPosts(int page, int size, PostType type, String searchTerm);
    SinglePostDTO getSinglePostDTO(Long id);
    Page<GetAllPostsDTO> getPostsByUser(String username, int page, int size);
    void deletePost(Long id);
    ResponseEntity<Post> updatePost(UpdatePostDTO updatePostDTO, Long id);
    void incrementPostPopularity(Long postId);
    List<Post> getPostsOrderedDescByPopularityFilteredByType(PostType type);
    List<Post> getPostsOrderedAscByPopularityFilteredByType(PostType type);
    List<Post> getPostsOrderedDescByCreationDateFilteredByType(PostType type);
    List<Post> getPostsOrderedAscByCreationDateFilteredByType(PostType type);
    List<Post> getPostsOrderedDescByRatingFilteredByType(PostType type);
    List<Post> getPostsOrderedAscByRatingFilteredByType(PostType type);
    Double getAverageRatingForPost(Long postId);
}
