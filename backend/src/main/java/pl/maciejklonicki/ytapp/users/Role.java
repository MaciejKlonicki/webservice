package pl.maciejklonicki.ytapp.users;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
public enum Role {
    USER,
    ADMIN;

    public List<SimpleGrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + this.name()));
    }
}
