package com.demo.lms.controller;

import com.demo.lms.model.User;
import com.demo.lms.model.VerificationToken;
import com.demo.lms.repository.UserRepository;
import com.demo.lms.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Autowired
    private UserRepository userRepository;
//    @GetMapping("/verify")
//    public ResponseEntity<String> verifyEmail(@RequestParam String token) {
//
//        VerificationToken vt = new VerificationToken();
//        verificationTokenRepository.findByToken(token)
//                .orElseThrow(() -> new RuntimeException("Invalid or expired token"));
//
//        User user = vt.getUser();
//        user.setStatus("ACTIVE");
//        userRepository.save(user);
//
//        verificationTokenRepository.delete(vt);
//
//        return ResponseEntity.ok("Email verified. You can now login using your default password.");
//    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam String token) {
        VerificationToken vt = verificationTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired token"));

        User user = vt.getUser();
        if (user == null) {
            throw new RuntimeException("No user associated with this token");
        }

        user.setStatus("ACTIVE");
        userRepository.save(user);
        verificationTokenRepository.delete(vt);

        return ResponseEntity.ok("Email verified. You can now login.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> req) {

        String email = req.get("email");
        String oldPw = req.get("oldPassword");
        String newPw = req.get("newPassword");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!Objects.equals(user.getPassword(), oldPw)) {
            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(newPw);
        userRepository.save(user);

        return ResponseEntity.ok("Password changed successfully");
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {

        String email = req.get("email");
        String password = req.get("password");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (user.getPassword() == null || !user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        if (!"ACTIVE".equals(user.getStatus())) {
            throw new RuntimeException("Email not verified");
        }

        return ResponseEntity.ok(Map.of(
                "email", user.getEmail(),
                "role", user.getRole()
        ));
    }
}
