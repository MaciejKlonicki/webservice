package pl.maciejklonicki.ytapp.posts;

import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PostService {
    ResponseEntity<Post> addPost (Post newPost);
    List<Post> getAllPosts ();
    Post getSinglePost (Long id);
    void deletePost(Long id);
    Post updatePost(Post post, Long id);
}
