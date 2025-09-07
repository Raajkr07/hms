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
    @Column(length = 36, updatable = false, nullable = false)
    private String id;

    @Column(unique = true, nullable = false)
    private String email;

    private String fullName;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String password;
}