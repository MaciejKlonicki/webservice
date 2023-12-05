package pl.maciejklonicki.ytapp.posts;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository <Post, Long> {
    Page<Post> findAll(Specification<Post> spec, Pageable pageable);
    List<Post> findAllByOrderByPopularityDesc();
    List<Post> findAllByOrderByCreationDateDesc();
    List<Post> findByTypeOrderByPopularityDesc(String type);
    List<Post> findByTypeOrderByCreationDateDesc(String type);
}
