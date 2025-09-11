package com.hopemeds.payment.service.impl;

import com.hopemeds.payment.dto.DonationRequestDTO;
import com.hopemeds.payment.dto.DonationResponseDTO;
import com.hopemeds.payment.entity.Donation;
import com.hopemeds.payment.repository.DonationRepository;
import com.hopemeds.payment.service.PaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {

    private final RazorpayClient razorpayClient;
    private final DonationRepository donationRepository;

    @Override
    public DonationResponseDTO createPaymentOrder(DonationRequestDTO donationRequest) throws Exception {
        // Amount in paise (smallest currency unit)
        int amountInPaise = (int) (donationRequest.getAmount() * 100);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amountInPaise);
        orderRequest.put("currency", "INR");
        orderRequest.put("payment_capture", 1);

        Order order = razorpayClient.Orders.create(orderRequest);

        // Save donation with pending payment
        Donation donation = Donation.builder()
                .razorpayOrderId(order.get("id"))
                .amount(donationRequest.getAmount())
                .name(donationRequest.getName())
                .email(donationRequest.getEmail())
                .mobile(donationRequest.getMobile())
                .pan(donationRequest.getPan())
                .address(donationRequest.getAddress())
                .isAdult(donationRequest.getIsAdult())
                .newsletter(donationRequest.getNewsletter())
                .donationDate(LocalDateTime.now())
                .build();

        Donation savedDonation = donationRepository.save(donation);

        return DonationResponseDTO.builder()
                .donationId(savedDonation.getId())
                .message(order.toString())
                .build();
    }

    @Override
    public DonationResponseDTO capturePayment(String paymentId, String orderId) throws Exception {
        // Razorpay captures payment automatically if payment_capture=1, so this might be optional

        // Here, you may implement webhook listener or manual capture logic

        // For demonstration, returning dummy success response
        return DonationResponseDTO.builder()
                .message("Payment captured successfully for order: " + orderId + ", payment: " + paymentId)
                .build();
    }
}
