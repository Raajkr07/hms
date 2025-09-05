package com.hopemeds.auth.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "oauth2_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OAuth2User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String provider;

    @Column(nullable = false, unique = true)
    private String providerId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
