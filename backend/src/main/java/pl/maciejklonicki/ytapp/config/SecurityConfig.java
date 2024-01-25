package pl.maciejklonicki.ytapp.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import pl.maciejklonicki.ytapp.auth.AuthAccessDeniedHandler;

import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private static final String POST_ENDPOINT = "/api/v1/posts/**";
    private static final String POST_RATING_ENDPOINT = "/api/v1/post-ratings/**";
    private static final String ROLE_ADMIN = "ADMIN";
    private static final String ROLE_USER = "USER";

    private static final String[] WHITE_LIST_URL = {
            "/api/v1/auth/**",
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**",
            "/swagger-ui.html"};

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers(WHITE_LIST_URL)
                                .permitAll()
                                .requestMatchers(PUT, "/api/v1/posts/update/*").hasAnyRole(ROLE_USER, ROLE_ADMIN)
                                .requestMatchers(GET, "/api/v1/posts/user/").hasAnyRole(ROLE_USER, ROLE_ADMIN)
                                .requestMatchers(POST, POST_ENDPOINT).hasAnyRole(ROLE_USER, ROLE_ADMIN)
                                .requestMatchers(DELETE, POST_ENDPOINT).hasAnyRole(ROLE_USER, ROLE_ADMIN)
                                .requestMatchers(GET, POST_ENDPOINT).permitAll()
                                .requestMatchers(PUT, POST_ENDPOINT).permitAll()

                                .requestMatchers(POST, POST_RATING_ENDPOINT).hasAnyRole(ROLE_USER, ROLE_ADMIN)
                                .requestMatchers(PUT, POST_RATING_ENDPOINT).hasAnyRole(ROLE_USER, ROLE_ADMIN)
                                .requestMatchers(DELETE, POST_RATING_ENDPOINT).hasAnyRole(ROLE_USER, ROLE_ADMIN)
                                .requestMatchers(GET, POST_RATING_ENDPOINT).permitAll()
                                .anyRequest()
                                .authenticated()
                )
                .exceptionHandling(exceptionHandling -> exceptionHandling.accessDeniedHandler(new AuthAccessDeniedHandler()))
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout ->
                        logout.logoutUrl("/api/v1/auth/logout")
                                .addLogoutHandler(logoutHandler)
                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                );

        return http.build();
    }
}