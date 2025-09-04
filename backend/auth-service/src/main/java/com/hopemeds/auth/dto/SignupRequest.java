package com.hopemeds.auth.dto;
import com.hopemeds.auth.entity.Role;

import lombok.Data;

@Data
public class SignupRequest {
    private String email;
    private String password;
    private String fullName;
    private String phoneNumber;
    private Role role;
    // if I add additional field in signup page then I will write here.
}
