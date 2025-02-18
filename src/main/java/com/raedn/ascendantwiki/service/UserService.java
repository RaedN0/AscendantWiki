package com.raedn.ascendantwiki.service;

import com.raedn.ascendantwiki.model.RegistrationRequest;
import com.raedn.ascendantwiki.model.Role;
import com.raedn.ascendantwiki.model.User;
import com.raedn.ascendantwiki.repository.RoleRepository;
import com.raedn.ascendantwiki.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User registerUser(RegistrationRequest request) {
        if (userRepository.findByUsername(request.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(true);
        user.setRoles(new HashSet<>());

        Role userRole = roleRepository.findByRoleName("ROLE_USER");
        user.getRoles().add(userRole);

        return userRepository.save(user);
    }

    public User getUserByUsername(String username) {
    	return userRepository.findByUsername(username);
    }
}