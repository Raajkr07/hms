package com.hopemeds.auth.repository;

import com.hopemeds.auth.entity.OAuth2User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OAuth2UserRepository extends JpaRepository<OAuth2User, String> {
    Optional<OAuth2User> findByProviderId(String providerId);
}
