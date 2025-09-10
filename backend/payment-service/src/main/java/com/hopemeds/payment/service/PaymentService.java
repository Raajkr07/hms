package com.hopemeds.payment.service;

import com.hopemeds.payment.dto.DonationRequestDTO;
import com.hopemeds.payment.dto.DonationResponseDTO;

public interface PaymentService {
    DonationResponseDTO createPaymentOrder(DonationRequestDTO donationRequest) throws Exception;
    DonationResponseDTO capturePayment(String paymentId, String orderId) throws Exception;
}

