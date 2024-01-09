package pl.maciejklonicki.ytapp.posts;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.maciejklonicki.ytapp.posts.dto.CreatePostDTO;
import pl.maciejklonicki.ytapp.posts.dto.SinglePostDTO;
import pl.maciejklonicki.ytapp.posts.dto.UpdatePostDTO;
import pl.maciejklonicki.ytapp.posts.exception.PostNotFoundException;
import pl.maciejklonicki.ytapp.posts.exception.PostTitleAlreadyExistsException;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public ResponseEntity<Post> addPost (CreatePostDTO createPostDTO) {
        if (postRepository.existsByTitle(createPostDTO.title())) {
            throw new PostTitleAlreadyExistsException(createPostDTO.title());
        }
        Post post = createPostFromDTO(createPostDTO);
        Post savedPost = postRepository.save(post);
        return ResponseEntity.ok(savedPost);
    }

    @Override
    public Page<Post> getAllPosts(int page, int size, PostType type, String searchTerm) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<Post> spec = Specification.where(null);

        if (type != null && type != PostType.ALL) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("type"), type));
        }

        if (searchTerm != null && !searchTerm.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("title")), "%" + searchTerm.toLowerCase() + "%"));
        }

        return postRepository.findAll(spec, pageable);
    }

    @Override
    public SinglePostDTO getSinglePostDTO(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new PostNotFoundException(id));

        return new SinglePostDTO(
                post.getTitle(),
                post.getBody(),
                post.getAuthor(),
                post.getType()
        );
    }

    @Override
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    @Override
    public ResponseEntity<Post> updatePost(UpdatePostDTO updatePostDTO, Long id) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isEmpty()) {
            throw new PostNotFoundException(id);
        }

        Post oldPost = optionalPost.get();

        oldPost.setTitle(updatePostDTO.title());
        oldPost.setBody(updatePostDTO.body());
        oldPost.setType(updatePostDTO.type());

        byte[] newPhoto = null;
        try {
            if (updatePostDTO.photo() != null) {
                newPhoto = updatePostDTO.photo().getBytes();
                if (newPhoto.length > 0) {
                    oldPost.setPhoto(newPhoto);
                }
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return ResponseEntity.ok(postRepository.save(oldPost));
    }


    @Override
    @Transactional
    public void incrementPostPopularity(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException(postId));
        post.incrementPopularity();
        postRepository.save(post);
    }

    @Transactional(readOnly = true)
    public List<Post> getPostsOrderedByPopularityFilteredByType(PostType type) {
        if (PostType.ALL.equals(type)) {
            return postRepository.findAllByOrderByPopularityDesc();
        } else {
            return postRepository.findByTypeOrderByPopularityDesc(type);
        }
    }

    @Transactional(readOnly = true)
    public List<Post> getPostsOrderedByCreationDateFilteredByType(PostType type) {
        if (PostType.ALL.equals(type)) {
            return postRepository.findAllByOrderByCreationDateDesc();
        } else {
            return postRepository.findByTypeOrderByCreationDateDesc(type);
        }
    }

    @Transactional(readOnly = true)
    public List<Post> getPostsOrderedByRatingFilteredByType(PostType type) {
        if (PostType.ALL.equals(type)) {
            return postRepository.findAllByOrderByAverageRatingDesc();
        } else {
            return postRepository.findByTypeOrderByAverageRatingDesc(type);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Double getAverageRatingForPost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException(postId));
        return post.calculateAverageRating();
    }

    private Post createPostFromDTO(CreatePostDTO createPostDTO) {
        Date creationDate = convertStringToDate(createPostDTO.creationDate());

        byte[] photoBytes = null;
        try {
            if (createPostDTO.photo() != null) {
                photoBytes = createPostDTO.photo().getBytes();
            }
        } catch (IOException e) {
            throw new IllegalArgumentException("Error converting MultipartFile to byte array", e);
        }

        return Post.builder()
                .title(createPostDTO.title())
                .body(createPostDTO.body())
                .author(createPostDTO.author())
                .type(createPostDTO.type())
                .creationDate(creationDate)
                .photo(photoBytes)
                .build();
    }

    private Date convertStringToDate(String dateString) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            return dateFormat.parse(dateString);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format", e);
        }
    }
}
