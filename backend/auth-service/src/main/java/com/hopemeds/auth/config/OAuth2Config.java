package com.hopemeds.auth.config;

import com.hopemeds.auth.security.OAuth2AuthenticationSuccessHandler;
import com.hopemeds.auth.security.SocialOAuth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class OAuth2Config {

    private final SocialOAuth2UserService socialOAuth2UserService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    public OAuth2Config(SocialOAuth2UserService socialOAuth2UserService,
                        OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler) {
        this.socialOAuth2UserService = socialOAuth2UserService;
        this.oAuth2AuthenticationSuccessHandler = oAuth2AuthenticationSuccessHandler;
    }

    @Bean
    public SecurityFilterChain oauth2FilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/oauth2/**")   // exclusively OAuth2 requests
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfo -> userInfo.userService(socialOAuth2UserService))
                        .successHandler(oAuth2AuthenticationSuccessHandler)
                )
                .csrf(csrf -> csrf.disable());

        return http.build();
    }

}
