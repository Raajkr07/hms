package com.hopemeds.payment.repository;

import com.hopemeds.payment.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    Optional<Donation> findByRazorpayOrderId(String razorpayOrderId);
}
