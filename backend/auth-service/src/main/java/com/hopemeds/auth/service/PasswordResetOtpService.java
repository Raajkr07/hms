package com.hopemeds.auth.service;

import com.hopemeds.auth.entity.User;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PasswordResetOtpService {

    private final Map<String, OtpEntry> otpStorage = new ConcurrentHashMap<>();
    private static final Logger logger = LoggerFactory.getLogger(PasswordResetOtpService.class);

    private static class OtpEntry {
        String otp;
        Instant expiry;

        public OtpEntry(String otp, Instant expiry) {
            this.otp = otp;
            this.expiry = expiry;
        }
    }

    public String generateOtpForUser(User user) {
        int otpNumber = 100000 + new Random().nextInt(900000);
        String otp = String.valueOf(otpNumber);
        Instant expiry = Instant.now().plus(15, ChronoUnit.MINUTES);
        otpStorage.put(user.getEmail(), new OtpEntry(otp, expiry));
        logger.info("Generated OTP {} for user {} valid until {}", otp, user.getEmail(), expiry);
        return otp;
    }

    public boolean validateOtp(String email, String otp) {
        OtpEntry entry = otpStorage.get(email);
        logger.info("Validating OTP for {}. Provided: {}, Stored: {}, Expiry: {}, Now: {}",
                email, otp, entry == null ? null : entry.otp,
                entry == null ? null : entry.expiry, Instant.now());

        if (entry == null || Instant.now().isAfter(entry.expiry)) {
            otpStorage.remove(email);
            logger.warn("OTP expired or not found for email {}", email);
            return false;
        }
        boolean result = entry.otp.equals(otp);
        logger.info("OTP validation result for {}: {}", email, result);
        return result;
    }

    public void invalidateOtp(String email) {
        otpStorage.remove(email);
    }
}

