package com.hopemeds.user.exception;

// Exception if a user is not found
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("User with ID " + id + " not found");
    }
}

