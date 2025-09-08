package com.hopemeds.auth.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import lombok.Builder;
import lombok.Data;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@Data
@Builder
public class MyOAuth2User implements OAuth2User, UserDetails {
    private String id;
    private String email;
    private String fullName;
    private Role role;
    private String password;

    // --- OAuth2User ---
    @Override
    public Map<String, Object> getAttributes() {
        return Map.of(
                "id", id,
                "email", email,
                "fullName", fullName
        );
    }

    @Override
    public String getName() {
        return email;
    }

    // --- UserDetails ---
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
