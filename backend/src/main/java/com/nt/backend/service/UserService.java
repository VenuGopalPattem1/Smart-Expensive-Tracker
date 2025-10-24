package com.nt.backend.service;


import org.springframework.stereotype.Service;

import com.nt.backend.entity.User;
import com.nt.backend.exception.ResourceNotFoundException;
import com.nt.backend.repo.UserRepo;

import java.util.List;

@Service
public class UserService {

    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User saveUser(User user) {
        return userRepo.save(user);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User getUserById(Long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " + id + " not found"));
    }

    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User with email " + email + " not found"));
    }

    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepo.delete(user);
    }

    public User findUserByName(String name){
        return userRepo.findByName(name)
               .orElseThrow(() -> new ResourceNotFoundException("User with name " + name + " not found"));
    }
}

