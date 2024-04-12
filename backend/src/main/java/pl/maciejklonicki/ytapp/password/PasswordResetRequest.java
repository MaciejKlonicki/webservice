package pl.maciejklonicki.ytapp.password;

public record PasswordResetRequest (
        String email,
        String newPassword,
        String confirmPassword
){ }
