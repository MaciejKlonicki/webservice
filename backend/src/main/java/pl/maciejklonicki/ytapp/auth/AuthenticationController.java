package pl.maciejklonicki.ytapp.auth;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import pl.maciejklonicki.ytapp.password.PasswordResetRequest;
import pl.maciejklonicki.ytapp.users.UserRepository;
import pl.maciejklonicki.ytapp.users.Users;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    private static final String ERROR_PAGE = "errorPage";
    private static final String ERROR_MESSAGE = "errorMessage";

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request,
            HttpServletRequest httpServletRequest
    ) throws MessagingException, UnsupportedEncodingException {
        return ResponseEntity.ok(authenticationService.register(request, getSiteURL(httpServletRequest)));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authenticationService.refreshToken(request, response);
    }

    @GetMapping("/verify")
    public ModelAndView verifyUser(@RequestParam("code") String code) {
        ResponseEntity<String> verificationResponse = authenticationService.confirmEmail(code);
        ModelAndView modelAndView = new ModelAndView("verificationResult");

        if (verificationResponse.getStatusCode().is2xxSuccessful()) {
            modelAndView.addObject("message", "Email verified successfully!");
        } else {
            modelAndView.addObject("message",
                    "Error: Couldn't verify email. Invalid verification code.");
        }

        return modelAndView;
    }

    @PostMapping("/password-reset-request")
    public ResponseEntity<String> resetPasswordRequest(@RequestBody PasswordResetRequest passwordResetRequest,
                                                       final HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        Optional<Users> users = userRepository.findByEmail(passwordResetRequest.email());
        String passwordResetURL = "";
        if (users.isPresent()) {
            String passwordResetToken = UUID.randomUUID().toString();
            authenticationService.createOrUpdatePasswordResetTokenForUser(users.get(), passwordResetToken);
            passwordResetURL = passwordResetEmailLink(users.get(), getSiteURL(request), passwordResetToken);
            return ResponseEntity.ok(passwordResetURL);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email does not exist in our database.");
        }
    }

    private String passwordResetEmailLink(Users users, String siteURL, String passwordResetToken)
            throws MessagingException, UnsupportedEncodingException {
        String verifyURL = siteURL + "/api/v1/auth/reset-password?code=" + passwordResetToken;
        authenticationService.sendPasswordResetVerificationEmail(users, verifyURL);
        return verifyURL;
    }

    @PostMapping("/reset-password")
    public ModelAndView processPasswordReset(@RequestParam("code") String passwordResetToken,
                                             @ModelAttribute PasswordResetRequest passwordResetRequest) {
        ModelAndView modelAndView = new ModelAndView();

        String tokenValidationResult = authenticationService.validatePasswordResetToken(passwordResetToken);
        if (!tokenValidationResult.equalsIgnoreCase("valid")) {
            modelAndView.setViewName(ERROR_PAGE);
            modelAndView.addObject(ERROR_MESSAGE, "Invalid password reset token");
            return modelAndView;
        }

        Users user = authenticationService.findUserByPasswordToken(passwordResetToken);
        if (user == null) {
            modelAndView.setViewName(ERROR_PAGE);
            modelAndView.addObject(ERROR_MESSAGE, "User not found with the provided token");
            return modelAndView;
        }

        try {
            authenticationService.resetUserPassword(user, passwordResetRequest.newPassword(),
                    passwordResetRequest.confirmPassword());
            modelAndView.setViewName("passwordResetResult");
            modelAndView.addObject("message", "Password has been reset successfully");
        } catch (IllegalArgumentException e) {
            modelAndView.setViewName(ERROR_PAGE);
            modelAndView.addObject(ERROR_MESSAGE, e.getMessage());
        }
        return modelAndView;
    }

    @GetMapping("/reset-password")
    public ModelAndView showResetPasswordForm(@RequestParam("code") String passwordResetToken) {
        ModelAndView modelAndView = new ModelAndView("changePasswordForm");

        String tokenValidationResult = authenticationService.validatePasswordResetToken(passwordResetToken);
        if (!tokenValidationResult.equalsIgnoreCase("valid")) {
            modelAndView.setViewName(ERROR_PAGE);
            modelAndView.addObject(ERROR_MESSAGE, "Invalid password reset token");
            return modelAndView;
        }

        modelAndView.addObject("code", passwordResetToken);
        return modelAndView;
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
}
