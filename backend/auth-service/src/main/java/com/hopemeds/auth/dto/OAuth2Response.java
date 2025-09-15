package com.hopemeds.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OAuth2Response {
    private String id;
    private String email;
    private String fullName;
    private String role;
    private String token;

    public OAuth2Response() {}

    public OAuth2Response(String id, String email, String fullName, String role, String token) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.token = token;
    }
}
