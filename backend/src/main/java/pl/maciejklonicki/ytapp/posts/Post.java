package pl.maciejklonicki.ytapp.posts;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import pl.maciejklonicki.ytapp.postcomment.PostComment;
import pl.maciejklonicki.ytapp.postrating.PostRating;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false, length = 100, unique = true)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String body;

    @Column(nullable = false, length = 50)
    private String author;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PostType type;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @Lob
    @Column(length = 1000)
    private byte[] photo;

    @Column(nullable = false)
    private int popularity;

    @Column(nullable = false)
    private int totalRatings = 0;

    @JsonManagedReference
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<PostRating> ratings = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<PostComment> comments;

    public void incrementPopularity() {
        this.popularity++;
    }

    public double calculateAverageRating() {
        if (ratings.isEmpty()) {
            return 0.0;
        }

        int sumOfRatings = 0;
        for (PostRating postRating : ratings) {
            sumOfRatings += postRating.getRating();
        }

        return (double) sumOfRatings / ratings.size();
    }
}
