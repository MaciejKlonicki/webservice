package pl.maciejklonicki.ytapp.password;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.maciejklonicki.ytapp.users.Users;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
  PasswordResetToken findByToken(String theToken);
  Optional<PasswordResetToken> findByUserId(Long userID);
}
