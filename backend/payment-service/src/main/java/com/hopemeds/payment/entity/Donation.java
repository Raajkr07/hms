package com.hopemeds.payment.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "donations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String razorpayOrderId;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, length = 10)
    private String mobile;

    @Column(length = 10)
    private String pan;

    @Column(length = 500)
    private String address;

    @Column(nullable = false)
    private Boolean isAdult;

    @Column(nullable = false)
    private Boolean newsletter;

    @Column(nullable = false)
    private LocalDateTime donationDate;
}

