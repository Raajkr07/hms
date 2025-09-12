package com.hopemeds.auth.service;

import com.hopemeds.auth.dto.JwtResponse;
import com.hopemeds.auth.dto.LoginRequest;
import com.hopemeds.auth.dto.SignupRequest;
import com.hopemeds.auth.entity.Role;
import com.hopemeds.auth.entity.User;
import com.hopemeds.auth.repository.UserRepository;
import com.hopemeds.auth.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final JwtTokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        logger.debug("Authenticating user with email: {}", loginRequest.getEmail());

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> {
                    return new RuntimeException("User not found");
                });

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        String token = tokenProvider.generateToken(
                user.getId(),
                user.getEmail(),
                List.of(user.getRole().name())
        );
        logger.debug("JWT token generated for user {}", user.getEmail());


        return new JwtResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole().name().toLowerCase());
    }

    public User registerUser(SignupRequest signUpRequest) {
        logger.debug("Registering user with email: {}", signUpRequest.getEmail());
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            logger.error("Email already in use: {}", signUpRequest.getEmail());
            throw new RuntimeException("Email already in use");
        }

        User user = User.builder()
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .fullName(signUpRequest.getFullName())
                .phoneNumber(signUpRequest.getPhoneNumber())
                .role(signUpRequest.getRole() != null ? signUpRequest.getRole() : Role.PATIENT)
                .build();

        User savedUser = userRepository.save(user);
        logger.info("User registered successfully: {}", savedUser.getEmail());
        return savedUser;
    }
}
