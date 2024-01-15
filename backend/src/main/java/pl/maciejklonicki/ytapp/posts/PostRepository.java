package pl.maciejklonicki.ytapp.posts;

import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.maciejklonicki.ytapp.posts.dto.GetAllPostsDTO;

import java.util.List;

public interface PostRepository extends JpaRepository <Post, Long> {
    Page<GetAllPostsDTO> findAll(Specification<Post> spec, Pageable pageable);
    List<Post> findAllByOrderByPopularityDesc();
    List<Post> findAllByOrderByCreationDateDesc();
    @Query("SELECT p, CASE WHEN SIZE(p.ratings) > 0 THEN AVG(r.rating) ELSE 0 END as avgRating FROM Post p LEFT JOIN p.ratings r GROUP BY p ORDER BY avgRating DESC")
    List<Post> findAllByOrderByAverageRatingDesc();
    List<Post> findByTypeOrderByPopularityDesc(PostType type);
    List<Post> findByTypeOrderByCreationDateDesc(PostType type);
    @Query("SELECT p, CASE WHEN SIZE(p.ratings) > 0 THEN AVG(r.rating) ELSE 0 END as avgRating FROM Post p LEFT JOIN p.ratings r WHERE p.type = :type GROUP BY p ORDER BY avgRating DESC")
    List<Post> findByTypeOrderByAverageRatingDesc(@Param("type") PostType type);
    boolean existsById(@NonNull Long id);
    boolean existsByTitle(String title);
}
