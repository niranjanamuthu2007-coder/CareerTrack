package CareerTrack;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ================= REGISTER =================

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        Optional<User> existingUser =
                userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body("Email already registered");
        }

        User savedUser =
                userRepository.save(user);

        savedUser.setPassword(null);

        return ResponseEntity.ok(savedUser);
    }


    // ================= LOGIN =================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User loginUser) {

        Optional<User> existingUser =
                userRepository.findByEmail(
                        loginUser.getEmail()
                );

        if (existingUser.isEmpty()) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        User user = existingUser.get();

        if (!user.getPassword()
                .equals(loginUser.getPassword())) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        user.setPassword(null);

        return ResponseEntity.ok(user);
    }
}