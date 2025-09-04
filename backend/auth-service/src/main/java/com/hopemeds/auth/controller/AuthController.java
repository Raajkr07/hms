package com.hopemeds.auth.controller;

import com.hopemeds.auth.dto.JwtResponse;
import com.hopemeds.auth.dto.LoginRequest;
import com.hopemeds.auth.dto.SignupRequest;
import com.hopemeds.auth.entity.User;
import com.hopemeds.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authenticateUser(loginRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<User> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        return ResponseEntity.ok(authService.registerUser(signupRequest));
    }
}

