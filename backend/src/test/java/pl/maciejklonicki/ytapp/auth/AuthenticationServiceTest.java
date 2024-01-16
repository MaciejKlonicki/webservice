package pl.maciejklonicki.ytapp.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpHeaders;
import org.springframework.mock.web.DelegatingServletOutputStream;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.maciejklonicki.ytapp.config.JwtService;
import pl.maciejklonicki.ytapp.token.TokenRepository;
import pl.maciejklonicki.ytapp.users.UserRepository;
import pl.maciejklonicki.ytapp.users.Users;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    private static final String TEST_USERNAME = "test_user";
    private static final String TEST_EMAIL = "test_email@mail.com";
    private static final String TEST_PASSWORD = "test_password";
    private static final String TEST_MOBILE = "0000000000";
    private static final String TEST_REFRESH_TOKEN = "fakeRefreshToken";
    private static final String TEST_ACCESS_TOKEN = "fakeAccessToken";

    private final RegisterRequest registerRequest = RegisterRequest.builder()
            .username(TEST_USERNAME)
            .email(TEST_EMAIL)
            .password(TEST_PASSWORD)
            .confirmPassword(TEST_PASSWORD)
            .mobile(TEST_MOBILE)
            .build();

    private final AuthenticationRequest authenticationRequest = AuthenticationRequest.builder()
            .username(TEST_USERNAME)
            .password(TEST_PASSWORD)
            .build();

    @Mock
    private UserRepository userRepository;

    @Mock
    private TokenRepository tokenRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    @Test
    void shouldRegisterNewUser() {
        when(passwordEncoder.encode(TEST_PASSWORD)).thenReturn("encodedPassword");
        when(userRepository.save(any())).thenAnswer(invocation -> {
            Users savedUser = invocation.getArgument(0);
            savedUser.setId(1L);
            return savedUser;
        });
        when(jwtService.generateToken(any())).thenReturn(TEST_ACCESS_TOKEN);
        when(jwtService.generateRefreshToken(any())).thenReturn(TEST_REFRESH_TOKEN);

        AuthenticationResponse response = authenticationService.register(registerRequest);

        verify(userRepository, times(1)).save(any());

        verify(jwtService, times(1)).generateToken(any());

        verify(jwtService, times(1)).generateRefreshToken(any());

        verify(tokenRepository, times(1)).save(any());

        assertNotNull(response);
        assertEquals(TEST_ACCESS_TOKEN, response.getAccessToken());
        assertEquals(TEST_REFRESH_TOKEN, response.getRefreshToken());
    }

    @Test
    void shouldAuthenticateUser() {
        Users user = Users.builder()
                .id(1L)
                .username(TEST_USERNAME)
                .password(TEST_PASSWORD)
                .build();

        when(authenticationManager.authenticate(any(Authentication.class))).thenReturn(
                new UsernamePasswordAuthenticationToken(TEST_USERNAME, TEST_PASSWORD, Collections.emptyList())
        );
        when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(Optional.of(user));
        when(jwtService.generateToken(user)).thenReturn(TEST_ACCESS_TOKEN);
        when(jwtService.generateRefreshToken(user)).thenReturn(TEST_REFRESH_TOKEN);
        when(tokenRepository.findAllValidTokenByUser(user.getId())).thenReturn(Collections.emptyList());
        AuthenticationResponse response = authenticationService.authenticate(authenticationRequest);

        verify(authenticationManager, times(1)).authenticate(any(Authentication.class));

        verify(userRepository, times(1)).findByUsername(TEST_USERNAME);

        verify(jwtService, times(1)).generateToken(user);

        verify(jwtService, times(1)).generateRefreshToken(user);

        verify(tokenRepository, times(1)).findAllValidTokenByUser(user.getId());

        assertNotNull(response);
        assertEquals(TEST_ACCESS_TOKEN, response.getAccessToken());
        assertEquals(TEST_REFRESH_TOKEN, response.getRefreshToken());
    }

    @Test
    void shouldRefreshToken() throws IOException {
        Users user = Users.builder()
                .username(TEST_USERNAME)
                .build();

        when(jwtService.extractUsername(TEST_REFRESH_TOKEN)).thenReturn(TEST_USERNAME);
        when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(Optional.of(user));
        when(jwtService.isTokenValid(TEST_REFRESH_TOKEN, user)).thenReturn(true);
        when(jwtService.generateToken(user)).thenReturn(TEST_ACCESS_TOKEN);

        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);

        when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn("Bearer " + TEST_REFRESH_TOKEN);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        when(response.getOutputStream()).thenReturn(new DelegatingServletOutputStream(byteArrayOutputStream));

        authenticationService.refreshToken(request, response);

        verify(jwtService, times(1)).extractUsername(TEST_REFRESH_TOKEN);

        verify(userRepository, times(1)).findByUsername(TEST_USERNAME);

        verify(jwtService, times(1)).isTokenValid(TEST_REFRESH_TOKEN, user);

        verify(jwtService, times(1)).generateToken(user);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(response.getOutputStream(), AuthenticationResponse.builder()
                .accessToken(TEST_ACCESS_TOKEN)
                .refreshToken(TEST_REFRESH_TOKEN)
                .build());

        String responseBody = byteArrayOutputStream.toString();
        assertNotNull(responseBody);
        assertTrue(responseBody.contains(TEST_ACCESS_TOKEN));
        assertTrue(responseBody.contains(TEST_REFRESH_TOKEN));
    }
}