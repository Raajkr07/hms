package com.hopemeds.auth.security;

import com.hopemeds.auth.entity.MyOAuth2User;
import com.hopemeds.auth.entity.OAuth2UserEntity;
import com.hopemeds.auth.repository.OAuth2UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService {

    private final OAuth2UserRepository oauth2UserRepository;

    public CustomUserDetailsService(OAuth2UserRepository oauth2UserRepository) {
        this.oauth2UserRepository = oauth2UserRepository;
    }

    // Load user by email (for standard authentication)
    public UserDetails loadUserByEmail(String email) {
        OAuth2UserEntity user = oauth2UserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return MyOAuth2User.builder()
                .id(String.valueOf(user.getId()))
                .email(user.getEmail())
                .fullName(user.getName())
                .role(user.getRole())
                .build();
    }

    // Load user by id (for JWT authentication)
    public UserDetails loadUserById(String id) {
        Long userId;
        try {
            userId = Long.parseLong(id);
        } catch (NumberFormatException ex) {
            throw new UsernameNotFoundException("Invalid user id: " + id);
        }

        OAuth2UserEntity user = oauth2UserRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));

        return MyOAuth2User.builder()
                .id(String.valueOf(user.getId()))
                .email(user.getEmail())
                .fullName(user.getName())
                .role(user.getRole())
                .build();
    }
}