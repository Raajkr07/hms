package com.hopemeds.auth.service;

import com.hopemeds.auth.dto.JwtResponse;
import com.hopemeds.auth.dto.LoginRequest;
import com.hopemeds.auth.dto.SignupRequest;
import com.hopemeds.auth.entity.Role;
import com.hopemeds.auth.entity.User;
import com.hopemeds.auth.repository.UserRepository;
import com.hopemeds.auth.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        var user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found")); // Customize exception

        String token = tokenProvider.generateToken(user.getId());

        return new JwtResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole().name());
    }

    public User registerUser(SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = User.builder()
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .fullName(signUpRequest.getFullName())
                .phoneNumber(signUpRequest.getPhoneNumber())
                .role(signUpRequest.getRole() != null ? signUpRequest.getRole() : Role.PATIENT)
                .build();

        return userRepository.save(user);
    }
}
