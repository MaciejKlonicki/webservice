package pl.maciejklonicki.ytapp.users.dto;

public record RegisterUserDTO (
        String username,
        String email,
        String password,
        String mobile
) { }
