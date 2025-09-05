package com.hopemeds.auth.repository;

import com.hopemeds.auth.entity.Role;
import com.hopemeds.auth.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(Role name);
}