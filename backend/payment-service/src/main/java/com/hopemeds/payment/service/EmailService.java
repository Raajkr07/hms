package com.hopemeds.payment.service;

public interface EmailService {
    void sendDonationConfirmationEmail(String toEmail, String name, Double amount);
}

