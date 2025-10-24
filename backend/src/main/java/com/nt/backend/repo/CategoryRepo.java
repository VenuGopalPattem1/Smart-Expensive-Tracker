package com.nt.backend.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.nt.backend.entity.Category;
import com.nt.backend.entity.User;

import java.util.List;

public interface CategoryRepo extends JpaRepository<Category, Long> {
    List<Category> findByUser(User user);
}

