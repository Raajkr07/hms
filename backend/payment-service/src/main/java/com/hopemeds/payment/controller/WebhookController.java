package com.hopemeds.payment.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hopemeds.payment.entity.Donation;
import com.hopemeds.payment.repository.DonationRepository;
import com.hopemeds.payment.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Optional;

@RestController
@RequestMapping("/api/webhooks")
@RequiredArgsConstructor
@Slf4j
public class WebhookController {

    private final DonationRepository donationRepository;
    private final EmailService emailService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${razorpay.keySecret}")
    private String razorpaySecret;

    private static final String RAZORPAY_SIGNATURE_HEADER = "X-Razorpay-Signature";

    @PostMapping("/razorpay")
    public ResponseEntity<String> handleRazorpayWebhook(@RequestHeader(RAZORPAY_SIGNATURE_HEADER) String signature,
                                                        @RequestBody String payload) {
        try {
            // Validate signature
            if (!validateSignature(payload, signature, razorpaySecret)) {
                log.warn("Invalid Razorpay webhook signature");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
            }
            // Parse payload using Jackson
            JsonNode root = objectMapper.readTree(payload);
            String eventType = root.path("event").asText();

            if ("payment.captured".equals(eventType)) {
                JsonNode paymentEntity = root.path("payload").path("payment").path("entity");

                String razorpayOrderId = paymentEntity.path("order_id").asText();
                String paymentId = paymentEntity.path("id").asText();
                double amount = paymentEntity.path("amount").asDouble() / 100.0;

                // Find the donation by razorpayOrderId (add this field to your Donation entity)
                Optional<Donation> donationOpt = donationRepository.findByRazorpayOrderId(razorpayOrderId);
                if (donationOpt.isPresent()) {
                    Donation donation = donationOpt.get();
                    log.info("Payment captured for donation id: {}, payment: {}", donation.getId(), paymentId);

                    // Send confirmation email
                    emailService.sendDonationConfirmationEmail(donation.getEmail(), donation.getName(), donation.getAmount());

                    // Optionally update donation status and save
                } else {
                    log.warn("No donation found for Razorpay order id: {}", razorpayOrderId);
                }
            }

            return ResponseEntity.ok("Webhook received");
        } catch (Exception ex) {
            log.error("Error processing webhook", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing webhook");
        }
    }

    private boolean validateSignature(String payload, String actualSignature, String secret) throws Exception {
        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
        sha256_HMAC.init(secret_key);

        byte[] hash = sha256_HMAC.doFinal(payload.getBytes("UTF-8"));
        String generatedSignature = toHexString(hash);

        return generatedSignature.equals(actualSignature);
    }

    private String toHexString(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }
}