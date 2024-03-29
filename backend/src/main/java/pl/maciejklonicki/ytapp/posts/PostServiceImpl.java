package pl.maciejklonicki.ytapp.posts;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.maciejklonicki.ytapp.postrating.PostRating;
import pl.maciejklonicki.ytapp.posts.dto.CreatePostDTO;
import pl.maciejklonicki.ytapp.posts.dto.GetAllPostsDTO;
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
import java.util.stream.Collectors;

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
    public Page<GetAllPostsDTO> getAllPosts(int page, int size, PostType type, String searchTerm) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<GetAllPostsDTO> spec = Specification.where(null);

        if (type != null && type != PostType.ALL) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("type"), type));
        }

        if (searchTerm != null && !searchTerm.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("title")), "%" + searchTerm.toLowerCase() + "%"));
        }

        return getGetAllPostsDTOS(pageable, spec);
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
    public Page<GetAllPostsDTO> getPostsByUser(String username, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<GetAllPostsDTO> spec = Specification.where((root, query, cb) ->
                cb.equal(root.get("author"), username));

        return getGetAllPostsDTOS(pageable, spec);
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

        return ResponseEntity.ok(postRepository.save(oldPost));
    }


    @Override
    @Transactional
    public void incrementPostPopularity(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException(postId));
        post.incrementPopularity();
        postRepository.save(post);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Post> getPostsOrderedDescByPopularityFilteredByType(PostType type) {
        if (PostType.ALL.equals(type)) {
            return postRepository.findAllByOrderByPopularityDesc();
        } else {
            return postRepository.findByTypeOrderByPopularityDesc(type);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Post> getPostsOrderedAscByPopularityFilteredByType(PostType type) {
        if (PostType.ALL.equals(type)) {
            return postRepository.findAllByOrderByPopularityAsc();
        } else {
            return postRepository.findByTypeOrderByPopularityAsc(type);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Post> getPostsOrderedDescByCreationDateFilteredByType(PostType type) {
        if (PostType.ALL.equals(type)) {
            return postRepository.findAllByOrderByCreationDateDesc();
        } else {
            return postRepository.findByTypeOrderByCreationDateDesc(type);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Post> getPostsOrderedAscByCreationDateFilteredByType(PostType type) {
        if (PostType.ALL.equals(type)) {
            return postRepository.findAllByOrderByCreationDateAsc();
        } else {
            return postRepository.findByTypeOrderByCreationDateAsc(type);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Post> getPostsOrderedDescByRatingFilteredByType(PostType type) {
        if (PostType.ALL.equals(type)) {
            return postRepository.findAllByOrderByAverageRatingDesc();
        } else {
            return postRepository.findByTypeOrderByAverageRatingDesc(type);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Post> getPostsOrderedAscByRatingFilteredByType(PostType type) {
        if (PostType.ALL.equals(type)) {
            return postRepository.findAllByOrderByAverageRatingAsc();
        } else {
            return postRepository.findByTypeOrderByAverageRatingAsc(type);
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

    private Page<GetAllPostsDTO> getGetAllPostsDTOS(Pageable pageable, Specification<GetAllPostsDTO> spec) {
        Page<Post> postPage = postRepository.findAll(spec, pageable);
        return postPage.map(post -> new GetAllPostsDTO(
                post.getId(),
                post.getTitle(),
                post.getAuthor(),
                post.getType(),
                post.getCreationDate(),
                post.getPhoto(),
                post.getPopularity(),
                post.getTotalRatings(),
                post.getRatings() != null ? post.getRatings().stream()
                        .map(PostRating::getRating).collect(Collectors.toList()) : null
        ));
    }
}
