package pl.maciejklonicki.ytapp.posts;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.maciejklonicki.ytapp.users.Users;
import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private String body;
    @NotNull
    @ManyToOne
    private Users users;

    public Post(String body, @NotNull Users users) {
        this.body = body;
        this.users = users;
    }
}
