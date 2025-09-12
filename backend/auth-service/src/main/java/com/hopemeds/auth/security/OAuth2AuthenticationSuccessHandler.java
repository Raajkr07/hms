package com.hopemeds.auth.security;

import com.hopemeds.auth.entity.OAuth2UserEntity;
import com.hopemeds.auth.entity.Role;
import com.hopemeds.auth.repository.OAuth2UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Value("${app.base-url}")
    private String baseUrl;

    private static final Logger logger = LoggerFactory.getLogger(OAuth2AuthenticationSuccessHandler.class);

    private final JwtTokenProvider tokenProvider;
    private final OAuth2UserRepository oauth2UserRepository;

    public OAuth2AuthenticationSuccessHandler(JwtTokenProvider tokenProvider,
                                              OAuth2UserRepository oauth2UserRepository) {
        this.tokenProvider = tokenProvider;
        this.oauth2UserRepository = oauth2UserRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        DefaultOidcUser oauthUser = (DefaultOidcUser) authentication.getPrincipal();
        Map<String, Object> attributes = oauthUser.getAttributes();

        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        // Find existing user or create a new one
        OAuth2UserEntity userEntity = oauth2UserRepository.findByEmail(email)
                .orElseGet(() -> {
                    OAuth2UserEntity newUser = new OAuth2UserEntity();
                    newUser.setEmail(email);
                    newUser.setName(name);
                    newUser.setRole(Role.PATIENT);
                    return oauth2UserRepository.save(newUser);
                });

        // Convert Long ID to String for token
        String token = tokenProvider.generateToken(
                String.valueOf(userEntity.getId()),
                userEntity.getEmail(),
                List.of(userEntity.getRole().name())
        );

        logger.debug("Generated JWT token for OAuth2User with email: {}", email);

        // Redirect to frontend with token
        String redirectUrl = baseUrl + "/oauth2/success#token=" + token;
        response.sendRedirect(redirectUrl);

        logger.debug("Redirected to frontend URL with token");
    }
}
