package pl.maciejklonicki.ytapp.posts.dto;

import pl.maciejklonicki.ytapp.posts.PostType;

import java.util.Date;

public record GetAllPostsDTO (
        String title,
        String author,
        PostType type,
        Date creationDate,
        byte[] photo,
        int popularity,
        int totalRatings
) { }
