package com.hopemeds.auth.security;

import com.hopemeds.auth.entity.MyOAuth2User;
import com.hopemeds.auth.entity.OAuth2UserEntity;
import com.hopemeds.auth.entity.Role;
import com.hopemeds.auth.repository.OAuth2UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SocialOAuth2UserService extends DefaultOAuth2UserService {
    private static final Logger logger = LoggerFactory.getLogger(SocialOAuth2UserService.class);

    private final OAuth2UserRepository oauth2UserRepository;

    public SocialOAuth2UserService(OAuth2UserRepository oauth2UserRepository) {
        this.oauth2UserRepository = oauth2UserRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = (String) attributes.get("email");
        if (email == null || email.isEmpty()) {
            throw new OAuth2AuthenticationException("Email not found from OAuth2 provider");
        }

        // Load or create new entity
        OAuth2UserEntity entity = oauth2UserRepository.findByEmail(email).orElseGet(() -> {
            OAuth2UserEntity newUser = OAuth2UserEntity.builder()
                    .email(email)
                    .name((String) attributes.getOrDefault("name", "Unknown User"))
                    .role(Role.PATIENT)
                    .build();
            return oauth2UserRepository.save(newUser);
        });

        return MyOAuth2User.builder()
                .id(String.valueOf(entity.getId()))
                .email(entity.getEmail())
                .fullName(entity.getName())
                .role(entity.getRole())
                .build();
    }
}
