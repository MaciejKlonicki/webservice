package pl.maciejklonicki.ytapp.posts;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    public Page<Post> getAllPosts(int page, int size, String type, String searchTerm) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<Post> spec = Specification.where(null);

        if (type != null && !type.isEmpty() && !type.equalsIgnoreCase("All")) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("type"), type));
        }

        if (searchTerm != null && !searchTerm.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("title")), "%" + searchTerm.toLowerCase() + "%"));
        }

        return postRepository.findAll(spec, pageable);
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
        oldPost.setType(post.getType());
        byte[] newPhoto = post.getPhoto();
        if (newPhoto != null && newPhoto.length > 0) {
            oldPost.setPhoto(newPhoto);
        }
        return postRepository.save(oldPost);
    }

    @Override
    @Transactional
    public void incrementPostPopularity(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException(postId));
        post.incrementPopularity();
        postRepository.save(post);
    }

    @Transactional(readOnly = true)
    public List<Post> getPostsOrderedByPopularityFilteredByType(String type) {
        if ("All".equals(type)) {
            return postRepository.findAllByOrderByPopularityDesc();
        } else {
            return postRepository.findByTypeOrderByPopularityDesc(type);
        }
    }

    @Transactional(readOnly = true)
    public List<Post> getPostsOrderedByCreationDateFilteredByType(String type) {
        if ("All".equals(type)) {
            return postRepository.findAllByOrderByCreationDateDesc();
        } else {
            return postRepository.findByTypeOrderByCreationDateDesc(type);
        }
    }
}
