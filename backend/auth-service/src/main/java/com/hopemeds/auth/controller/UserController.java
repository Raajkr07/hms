package com.hopemeds.auth.controller;

import com.hopemeds.auth.dto.UserDto;
import com.hopemeds.auth.entity.User;
import com.hopemeds.auth.mapper.UserMapper;
import com.hopemeds.auth.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/account/users")
public class UserController {

    private final UserService userService;
    private final UserMapper mapper;

    public UserController(UserService userService, UserMapper mapper) {
        this.userService = userService;
        this.mapper = mapper;
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.findByEmail(email);
        return user.map(value -> ResponseEntity.ok(mapper.toDto(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
