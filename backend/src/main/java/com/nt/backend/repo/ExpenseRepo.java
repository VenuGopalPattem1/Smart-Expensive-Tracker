package com.nt.backend.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.nt.backend.entity.Category;
import com.nt.backend.entity.Expenses;
import com.nt.backend.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepo extends JpaRepository<Expenses, Long> {
    List<Expenses> findByUser(User user);
    List<Expenses> findByCategory(Category category);
    List<Expenses> findByUserAndDateBetween(User user, LocalDate start, LocalDate end);
}

