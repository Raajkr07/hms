package com.hopemeds.auth.service;

import com.hopemeds.auth.entity.PasswordResetToken;
import com.hopemeds.auth.entity.User;
import com.hopemeds.auth.repository.PasswordResetTokenRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
public class PasswordResetTokenService {

    private final PasswordResetTokenRepository repository;

    public PasswordResetTokenService(PasswordResetTokenRepository repository) {
        this.repository = repository;
    }

    public PasswordResetToken createPasswordResetToken(User user) {
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .user(user)
                .expiryDate(Instant.now().plus(30, ChronoUnit.MINUTES))
                .build();
        return repository.save(resetToken);
    }

    public PasswordResetToken validateToken(String token) {
        PasswordResetToken resetToken = repository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid password reset token"));

        if (resetToken.getExpiryDate().isBefore(Instant.now())) {
            throw new RuntimeException("Token expired");
        }

        return resetToken;
    }

    public void invalidateToken(PasswordResetToken token) {
        repository.delete(token);
    }
}

