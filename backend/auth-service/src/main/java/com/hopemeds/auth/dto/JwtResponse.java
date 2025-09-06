package com.hopemeds.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtResponse {

    private String token;
    private String tokenType = "Bearer";
    private String id;
    private String email;
    private String fullName;
    private String role;

    public JwtResponse(String token, String id, String email, String fullName, String role) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.tokenType = "Bearer";
    }
}
