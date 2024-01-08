package pl.maciejklonicki.ytapp.postrating;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import pl.maciejklonicki.ytapp.posts.Post;
import pl.maciejklonicki.ytapp.users.Users;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostRating {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @Column(nullable = false)
    private int rating;
}
