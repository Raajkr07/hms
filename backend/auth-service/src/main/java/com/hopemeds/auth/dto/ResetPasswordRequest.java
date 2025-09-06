package com.hopemeds.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ResetPasswordRequest {

    @NotBlank(message = "Token must be provided")
    private String token;

    @NotBlank(message = "New password must be provided")
    private String newPassword;
}
