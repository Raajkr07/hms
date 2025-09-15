package com.hopemeds.auth.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;

@Slf4j
@Component
public class GlobalExceptionResolver implements HandlerExceptionResolver {

    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        log.error("Exception caught by GlobalExceptionResolver: ", ex);

        try {
            if (ex instanceof AuthenticationException) {
                // Authentication error - send 401 Unauthorized
                response.sendError(HttpStatus.UNAUTHORIZED.value(), "Authentication failed: " + ex.getMessage());
            } else {
                // Other exceptions - send 500 Internal Server Error
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error: " + ex.getMessage());
            }
        } catch (IOException e) {
            log.error("Failed to send error response: ", e);
        }
        // Return empty ModelAndView to indicate exception handled directly
        return new ModelAndView();
    }
}

