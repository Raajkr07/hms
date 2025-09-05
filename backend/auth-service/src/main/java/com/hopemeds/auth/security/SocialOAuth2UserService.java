package com.hopemeds.auth.security;

import com.hopemeds.auth.entity.Role;
import com.hopemeds.auth.entity.User;
import com.hopemeds.auth.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
public class SocialOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public SocialOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> attributes = oAuth2User.getAttributes();
        String email = (String) attributes.get("email");

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = User.builder()
                    .id(UUID.randomUUID().toString())
                    .email(email)
                    .fullName((String) attributes.getOrDefault("name", "Unknown User"))
                    .role(Role.PATIENT)
                    .password("")
                    .build();
            return userRepository.save(newUser);
        });

        return oAuth2User;
    }
}
