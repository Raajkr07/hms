package com.hopemeds.payment.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonationResponseDTO {
    private Long donationId;
    private String message;
}

