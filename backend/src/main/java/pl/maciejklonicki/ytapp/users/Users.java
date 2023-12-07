package pl.maciejklonicki.ytapp.users;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import pl.maciejklonicki.ytapp.postrating.PostRating;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false, length = 64, unique = true)
    private String username;

    @Column(length = 128, unique = true, nullable = false)
    private String email;

    @Column(nullable = false, length = 128)
    private String password;

    @Column(length = 9)
    private String mobile;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<PostRating> ratings = new ArrayList<>();
}
