package com.hopemeds.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OtpVerifyResponse {
    private String message;
    private String token;
    private boolean success;
}
