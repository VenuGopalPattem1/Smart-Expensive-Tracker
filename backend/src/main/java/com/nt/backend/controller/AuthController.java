package com.nt.backend.controller;

import com.nt.backend.entity.User;
import com.nt.backend.security.JwtUtil;
import com.nt.backend.service.UserService;

import lombok.AllArgsConstructor;
import lombok.Data;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
// @CrossOrigin(origins="*")
public class AuthController {

    private final AuthenticationManager authManager;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(@Lazy AuthenticationManager authManager,
                          UserService userService,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.authManager = authManager;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping(value = "/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userService.saveUser(user);
        return ResponseEntity.status(201).body(savedUser);
    }

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        User u=userService.findUserByName(request.getUsername());
        String token = jwtUtil.generateToken(request.getUsername());
        Output op=new Output(token,u.getId());
        return ResponseEntity.ok(op);
    }
    @Data
    static class AuthRequest{
        private String username;
        private String password;
    }
    @Data
    @AllArgsConstructor
    static class Output{
        private String token;
        private Long id;
    }
}

