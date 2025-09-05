package com.hopemeds.auth.dto;

import lombok.Data;

@Data
public class UserDto {
    private String id;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String role;
}
