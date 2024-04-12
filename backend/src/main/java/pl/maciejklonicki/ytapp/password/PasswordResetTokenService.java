package pl.maciejklonicki.ytapp.password;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.maciejklonicki.ytapp.users.Users;

import java.util.Calendar;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PasswordResetTokenService {

  private final PasswordResetTokenRepository passwordResetTokenRepository;

  public void createPasswordResetTokenForUser(Users user, String passwordToken) {
    PasswordResetToken passwordResetToken = new PasswordResetToken(passwordToken, user);
    passwordResetTokenRepository.save(passwordResetToken);
  }

  public String validatePasswordResetToken(String theToken) {
    PasswordResetToken token = passwordResetTokenRepository.findByToken(theToken);
    if (token == null) {
      return "Invalid password reset token";
    }
    Calendar calendar = Calendar.getInstance();
    if ((token.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {
      return "Link already expired, resend link";
    }
    return "valid";
  }

  public Optional<Users> findUsersByPasswordToken(String passwordToken) {
    return Optional.ofNullable(passwordResetTokenRepository.findByToken(passwordToken).getUser());
  }

  public Optional<PasswordResetToken> findPasswordResetTokenByUserId(Long userId) {
    return passwordResetTokenRepository.findByUserId(userId);
  }

  public void savePasswordResetToken(PasswordResetToken passwordResetToken) {
    passwordResetTokenRepository.save(passwordResetToken);
  }
}
