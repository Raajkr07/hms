package com.hopemeds.auth.security;

import com.hopemeds.auth.entity.Role;
import com.hopemeds.auth.entity.User;
import com.hopemeds.auth.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.UUID;

@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;

    public OAuth2AuthenticationSuccessHandler(JwtTokenProvider tokenProvider,
                                              UserRepository userRepository) {
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        var oauthUser = (DefaultOAuth2User) authentication.getPrincipal();
        String email = (String) oauthUser.getAttributes().get("email");

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = User.builder()
                    .id(UUID.randomUUID().toString())
                    .email(email)
                    .fullName((String) oauthUser.getAttributes().getOrDefault("name", "Unknown User"))
                    .role(Role.PATIENT)
                    .password("")
                    .build();
            return userRepository.save(newUser);
        });

        String token = tokenProvider.generateToken(user.getId());

        String origin = request.getHeader("Origin");
        String redirectUrl = (origin != null && origin.contains("localhost")) ?
                "http://localhost:5173/oauth2/success" :
                "https://hopemeds.netlify.app/oauth2/success";

        response.sendRedirect(redirectUrl + "#token=" + token);
    }
}
