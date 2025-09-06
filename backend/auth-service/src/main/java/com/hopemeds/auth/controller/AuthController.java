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

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@Valid @RequestBody OtpVerificationRequest request) {
        boolean valid = passwordResetOtpService.validateOtp(request.getEmail(), request.getOtp());
        if (!valid) {
            return ResponseEntity.badRequest().body(new OtpVerifyResponse("Invalid or expired OTP", null, false));
        }
        passwordResetOtpService.invalidateOtp(request.getEmail());

        User user = userService.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found after OTP verification"));
        PasswordResetToken resetToken = passwordResetTokenService.createPasswordResetToken(user);
        return ResponseEntity.ok(new OtpVerifyResponse("OTP verified", resetToken.getToken(), true));
    }



    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        // Send generic success to prevent user enumeration
        userService.findByEmail(request.getEmail()).ifPresent(user -> {
            String otp = passwordResetOtpService.generateOtpForUser(user);
            String emailContent = "Your password reset code is: " + otp + "\nThis code is valid for 15 minutes.";
            emailService.sendEmail(user.getEmail(), "Password Reset Request", emailContent);
        });
        return ResponseEntity.ok("If your email exists in our system, you will receive a password reset OTP shortly.");
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
