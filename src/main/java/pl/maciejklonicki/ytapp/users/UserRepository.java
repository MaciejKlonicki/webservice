package pl.maciejklonicki.ytapp.users;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository <Users, Long> {
    List<Users> findByUsername(String username);
}
