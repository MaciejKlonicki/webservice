package pl.maciejklonicki.ytapp.posts;

import com.sun.istack.NotNull;
import pl.maciejklonicki.ytapp.users.Users;
import javax.persistence.*;

@Entity
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
    public Post() {
    }

    public Post(Long id, String body, @NotNull Users users) {
        this.id = id;
        this.body = body;
        this.users = users;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", body='" + body + '\'' +
                ", users=" + users +
                '}';
    }
}
