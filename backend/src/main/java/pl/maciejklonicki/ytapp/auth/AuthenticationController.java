package pl.maciejklonicki.ytapp.auth;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

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

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
}
