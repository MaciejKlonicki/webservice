package pl.maciejklonicki.ytapp.posts;

import lombok.*;
import pl.maciejklonicki.ytapp.users.Users;
import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String body;
    @NonNull
    @ManyToOne
    private Users users;

    public Post(String body, @NonNull Users users) {
        this.body = body;
        this.users = users;
    }
}
