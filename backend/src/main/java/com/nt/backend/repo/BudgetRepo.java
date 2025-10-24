package com.nt.backend.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.nt.backend.entity.Budget;
import com.nt.backend.entity.Category;
import com.nt.backend.entity.User;

import java.util.List;

public interface BudgetRepo extends JpaRepository<Budget, Long> {
    List<Budget> findByUser(User user);
    List<Budget> findByCategory(Category category);
}

