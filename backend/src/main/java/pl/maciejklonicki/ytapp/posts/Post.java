package pl.maciejklonicki.ytapp.posts;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

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
    private String title;
    @Column(nullable = false, length = 1000)
    private String body;
    @Column(nullable = false)
    private String author;
    @Column(nullable = false)
    private String type;
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;
    @Lob
    @Column(length = 1000)
    private byte[] photo;
    @Column(nullable = false)
    private int popularity;

    public void incrementPopularity() {
        this.popularity++;
    }
}
