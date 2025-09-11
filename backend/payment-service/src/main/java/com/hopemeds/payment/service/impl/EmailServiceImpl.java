package com.hopemeds.payment.service.impl;

import com.hopemeds.payment.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendDonationConfirmationEmail(String toEmail, String name, Double amount) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);

            message.setSubject("Thank you for your HopeMeds donation");

            String formattedAmount = String.format("₹%.2f", amount);

            message.setText("""
                    Dear %s,

                    Thank you for your generous donation of %s.
                    Your support helps us redistribute medicines to those in need.

                    Best regards,
                    HopeMeds Team
                    """.formatted(name, formattedAmount));

            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send donation email: " + e.getMessage());
        }
    }
}

