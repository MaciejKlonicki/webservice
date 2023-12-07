package pl.maciejklonicki.ytapp.postrating;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.maciejklonicki.ytapp.posts.Post;
import pl.maciejklonicki.ytapp.users.Users;

public interface PostRatingRepository extends JpaRepository<PostRating, Long> {
    boolean existsByUserAndPost(Users user, Post post);
}
