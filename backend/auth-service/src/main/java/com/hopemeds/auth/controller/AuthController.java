package com.hopemeds.auth.controller;

import com.hopemeds.auth.dto.*;
import com.hopemeds.auth.entity.User;
import com.hopemeds.auth.entity.PasswordResetToken;
import com.hopemeds.auth.entity.VerificationToken;
import com.hopemeds.auth.service.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Random;

@RestController
@RequestMapping("/account")
public class AuthController {

    private final AuthService authService;
    private final VerificationTokenService verificationTokenService;
    private final EmailService emailService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenService passwordResetTokenService;
    private final PasswordResetOtpService passwordResetOtpService;

    public AuthController(AuthService authService,
                          VerificationTokenService verificationTokenService,
                          EmailService emailService,
                          PasswordResetTokenService passwordResetTokenService,
                          UserService userService,
                          PasswordEncoder passwordEncoder, PasswordResetOtpService passwordResetOtpService) {
        this.authService = authService;
        this.verificationTokenService = verificationTokenService;
        this.emailService = emailService;
        this.passwordResetTokenService = passwordResetTokenService;
        this.passwordResetOtpService = passwordResetOtpService;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authenticateUser(loginRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        User user = authService.registerUser(signupRequest);

        VerificationToken token = verificationTokenService.createVerificationToken(user);
        String verifyUrl = "http://localhost:8080/api/auth/verify?token=" + token.getToken();
        emailService.sendEmail(user.getEmail(), "Email Verification", "Click to verify: " + verifyUrl);

        return ResponseEntity.ok("User registered successfully. Check email for verification.");
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam("token") String token) {
        VerificationToken verificationToken = verificationTokenService.validateToken(token);
        User user = verificationToken.getUser();
        user.setEmailVerified(true);
        userService.save(user);
        return ResponseEntity.ok("Email verified successfully.");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        User user = userService.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        PasswordResetToken resetToken = passwordResetTokenService.createPasswordResetToken(user);
        String resetUrl = "http://localhost:3000/reset-password?token=" + resetToken.getToken();
        emailService.sendEmail(user.getEmail(), "Password Reset Request", "Reset your password: " + resetUrl);

        return ResponseEntity.ok("Password reset email sent.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        PasswordResetToken resetToken = passwordResetTokenService.validateToken(request.getToken());
        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userService.save(user);
        passwordResetTokenService.invalidateToken(resetToken);

        return ResponseEntity.ok("Password reset successfully.");
    }
}
