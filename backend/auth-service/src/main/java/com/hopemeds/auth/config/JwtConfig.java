package com.hopemeds.auth.config;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Component
@ConfigurationProperties(prefix = "app")
@Getter
@Setter
public class JwtConfig {

    private String jwtSecret;

    private int jwtExpirationMs;

    public SignatureAlgorithm getSignatureAlgorithm() {
        return SignatureAlgorithm.HS512;
    }

    public SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }
}
