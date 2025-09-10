package com.hopemeds.payment.controller;

import com.hopemeds.payment.dto.DonationRequestDTO;
import com.hopemeds.payment.dto.DonationResponseDTO;
import com.hopemeds.payment.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<DonationResponseDTO> createOrder(@Valid @RequestBody DonationRequestDTO donationRequest) throws Exception {
        DonationResponseDTO response = paymentService.createPaymentOrder(donationRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/capture-payment")
    public ResponseEntity<DonationResponseDTO> capturePayment(@RequestParam String paymentId, @RequestParam String orderId) throws Exception {
        DonationResponseDTO response = paymentService.capturePayment(paymentId, orderId);
        return ResponseEntity.ok(response);
    }
}

