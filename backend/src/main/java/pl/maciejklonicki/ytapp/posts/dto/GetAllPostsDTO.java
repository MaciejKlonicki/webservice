package pl.maciejklonicki.ytapp.posts.dto;

import pl.maciejklonicki.ytapp.posts.PostType;

import java.util.Date;
import java.util.List;

public record GetAllPostsDTO (
        Long id,
        String title,
        String author,
        PostType type,
        Date creationDate,
        byte[] photo,
        int popularity,
        int totalRatings,
        List<Integer> ratings
) { }
