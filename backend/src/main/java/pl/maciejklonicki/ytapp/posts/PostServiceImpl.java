package pl.maciejklonicki.ytapp.posts;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.maciejklonicki.ytapp.posts.exception.PostNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public ResponseEntity<Post> addPost (Post newPost) {
        Post savedPost = postRepository.save(newPost);
        return ResponseEntity.ok(savedPost);
    }

    @Override
    public List<Post> getAllPosts () {
        return postRepository.findAll();
    }

    @Override
    public Post getSinglePost (Long id) {
        return postRepository.findById(id).orElseThrow();
    }

    @Override
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    @Override
    public Post updatePost(Post post, Long id) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isEmpty()) {
            throw new PostNotFoundException(id);
        }
        Post oldPost = optionalPost.get();
        oldPost.setTitle(post.getTitle());
        oldPost.setBody(post.getBody());
        oldPost.setAuthor(post.getAuthor());
        return postRepository.save(oldPost);
    }
}
