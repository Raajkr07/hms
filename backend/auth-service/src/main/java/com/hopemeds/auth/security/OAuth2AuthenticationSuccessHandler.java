package com.hopemeds.auth.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hopemeds.auth.entity.User;
import com.hopemeds.auth.repository.UserRepository;
import com.hopemeds.auth.security.JwtTokenProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public OAuth2AuthenticationSuccessHandler(JwtTokenProvider tokenProvider,
                                              UserRepository userRepository) {
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        var oauthUser = (org.springframework.security.oauth2.core.user.DefaultOAuth2User) authentication.getPrincipal();
        String email = (String) oauthUser.getAttributes().get("email");

        User user = userRepository.findByEmail(email).orElseThrow();

        String token = tokenProvider.generateToken(user.getId());

        // it will Send JWT token as JSON response
        response.setContentType("application/json");
        var jsonResponse = objectMapper.writeValueAsString(new JwtTokenResponse(token));
        response.getWriter().write(jsonResponse);
        response.getWriter().flush();
    }

    // Helper inner class JWT response
    private static class JwtTokenResponse {
        public final String token;
        public JwtTokenResponse(String token) { this.token = token; }
    }
}

