package com.hopemeds.auth.mapper;

import com.hopemeds.auth.dto.UserDto;
import com.hopemeds.auth.entity.Role;
import com.hopemeds.auth.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDto toDto(User user) {
        if (user == null) {
            return null;
        }
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setRole(user.getRole() != null ? user.getRole().name() : null);
        dto.setPhoneNumber(user.getPhoneNumber());
        return dto;
    }

    public User toEntity(UserDto dto) {
        if (dto == null) {
            return null;
        }
        User user = new User();
        user.setId(dto.getId());
        user.setEmail(dto.getEmail());
        user.setFullName(dto.getFullName());
        user.setPhoneNumber(dto.getPhoneNumber());

        if (dto.getRole() != null) {
            try {
                user.setRole(Role.valueOf(dto.getRole()));
            } catch (IllegalArgumentException ex) {
                throw new IllegalArgumentException("Invalid role value: " + dto.getRole());
            }
        } else {
            user.setRole(null);
        }
        return user;
    }
}
