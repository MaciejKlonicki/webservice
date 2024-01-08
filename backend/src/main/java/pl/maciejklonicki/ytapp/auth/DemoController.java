package pl.maciejklonicki.ytapp.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/hello")
public class DemoController {

    @GetMapping
    public ResponseEntity<String> hi() {
        return ResponseEntity.ok("hi");
    }
}
