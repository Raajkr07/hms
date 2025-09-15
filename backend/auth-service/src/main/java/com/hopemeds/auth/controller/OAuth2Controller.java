package com.hopemeds.auth.controller;

import com.hopemeds.auth.dto.OAuth2Response;
import com.hopemeds.auth.entity.MyOAuth2User;
import com.hopemeds.auth.entity.OAuth2UserEntity;
import com.hopemeds.auth.repository.OAuth2UserRepository;
import com.hopemeds.auth.security.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class OAuth2Controller {

    private final JwtTokenProvider tokenProvider;
    private final OAuth2UserRepository oauth2UserRepository;

    public OAuth2Controller(JwtTokenProvider tokenProvider, OAuth2UserRepository oauth2UserRepository) {
        this.tokenProvider = tokenProvider;
        this.oauth2UserRepository = oauth2UserRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal MyOAuth2User oauthUser) {
        if (oauthUser == null) {
            return ResponseEntity.status(401).body("Unauthorized: OAuth user is null");
        }

        try {
            OAuth2UserEntity user = oauth2UserRepository.findByEmail(oauthUser.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String userId = String.valueOf(user.getId());
            String token = tokenProvider.generateToken(
                    userId,
                    user.getEmail(),
                    List.of(user.getRole().name())
            );

            OAuth2Response response = new OAuth2Response(
                    userId,
                    user.getEmail(),
                    user.getName(),
                    user.getRole().name(),
                    token
            );

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error");
        }
    }
}