package com.hopemeds.auth.repository;

import com.hopemeds.auth.entity.OAuth2UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OAuth2UserRepository extends JpaRepository<OAuth2UserEntity, Long> {
    Optional<OAuth2UserEntity> findByEmail(String email);
}
