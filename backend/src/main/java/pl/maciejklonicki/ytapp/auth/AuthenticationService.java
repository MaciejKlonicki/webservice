package pl.maciejklonicki.ytapp.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.maciejklonicki.ytapp.auth.exception.PasswordMismatchException;
import pl.maciejklonicki.ytapp.auth.exception.UserNotEnabledException;
import pl.maciejklonicki.ytapp.config.JwtService;
import pl.maciejklonicki.ytapp.password.PasswordResetTokenService;
import pl.maciejklonicki.ytapp.token.Token;
import pl.maciejklonicki.ytapp.token.TokenRepository;
import pl.maciejklonicki.ytapp.token.TokenType;
import pl.maciejklonicki.ytapp.users.Role;
import pl.maciejklonicki.ytapp.users.UserRepository;
import pl.maciejklonicki.ytapp.users.Users;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final JavaMailSender mailSender;
    private final PasswordResetTokenService passwordResetTokenService;

    @Autowired
    public AuthenticationService(JavaMailSender mailSender, UserRepository userRepository,
                                 TokenRepository tokenRepository, PasswordEncoder passwordEncoder,
                                 JwtService jwtService, AuthenticationManager authenticationManager,
                                 PasswordResetTokenService passwordResetTokenService) {
        this.mailSender = mailSender;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.passwordResetTokenService = passwordResetTokenService;
    }

    public AuthenticationResponse register(RegisterRequest request, String siteURL)
            throws MessagingException, UnsupportedEncodingException {

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new PasswordMismatchException("Password and confirmation do not match");
        }

        String randomCode = RandomString.make(8);

        var user = Users.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .mobile(request.getMobile())
                .role(Role.USER)
                .verificationCode(randomCode)
                .enabled(false)
                .build();
        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        sendVerificationEmail(user, siteURL);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();

        if (!user.isEnabled()) {
            throw new UserNotEnabledException("User: " + user.getUsername() + " hasn't verify email address");
        }

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public ResponseEntity<String> confirmEmail (String verificationCode) {
        Users user = userRepository.findByVerificationCode(verificationCode);

        if (user == null) {
            return ResponseEntity.badRequest().body("Error: Couldn't verify email. Invalid verification code.");
        }

        if (user.isEnabled()) {
            return ResponseEntity.ok("Email already verified!");
        } else {
            user.setVerificationCode(null);
            user.setEnabled(true);
            userRepository.save(user);

            return ResponseEntity.ok("Email verified successfully!");
        }
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.userRepository.findByUsername(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

    private void saveUserToken(Users users, String jwtToken) {
        var token = Token.builder()
                .users(users)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(Users users) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(users.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    void sendVerificationEmail(Users users, String siteURL)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = users.getEmail();
        String fromAddress = "webservicesystems@gmail.com";
        String senderName = "Webservice";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Webservice Team :)";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", users.getUsername());
        String verifyURL = siteURL + "/api/v1/auth/verify?code=" + users.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    public void sendPasswordResetVerificationEmail(Users users, String url) throws MessagingException, UnsupportedEncodingException {
        String subject = "Password Reset Request Verification";
        String senderName = "User Registration Portal Service";
        String mailContent = "<p> Hi, "+ users.getUsername()+ ", </p>"+
                "<p><b>You recently requested to reset your password,</b>"+"" +
                "Please, follow the link below to complete the action.</p>"+
                "<a href=\"" +url+ "\">Reset password</a>"+
                "<p> Users Registration Portal Service";
        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom("webservicesystems@gmail.com", senderName);
        messageHelper.setTo(users.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);
        mailSender.send(message);
    }

    public void createPasswordResetTokenForUser(Users users, String passwordToken) {
        passwordResetTokenService.createPasswordResetTokenForUser(users, passwordToken);
    }

    public String validatePasswordResetToken(String passwordResetToken) {
        return passwordResetTokenService.validatePasswordResetToken(passwordResetToken);
    }

    public Users findUserByPasswordToken(String passwordResetToken) {
        return passwordResetTokenService.findUsersByPasswordToken(passwordResetToken).get();
    }

    public void resetUserPassword(Users users, String newPassword) {
        users.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(users);
    }
}