package pl.maciejklonicki.ytapp.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository <Users, Long> {
    Optional<Users> findByEmail(String email);
    Optional<Users> findByUsername(String username);

    @Query("SELECT u FROM Users u WHERE u.verificationCode = ?1")
    public Users findByVerificationCode(String code);
}
