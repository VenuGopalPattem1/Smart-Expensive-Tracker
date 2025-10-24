package com.nt.backend.service;


import org.springframework.stereotype.Service;

import com.nt.backend.entity.Budget;
import com.nt.backend.entity.Category;
import com.nt.backend.entity.User;
import com.nt.backend.exception.ResourceNotFoundException;
import com.nt.backend.repo.BudgetRepo;

import java.util.List;

@Service
public class BudgetService {

    private final BudgetRepo budgetRepo;

    public BudgetService(BudgetRepo budgetRepo) {
        this.budgetRepo = budgetRepo;
    }

    public Budget saveBudget(Budget budget) {
        return budgetRepo.save(budget);
    }

    public List<Budget> getAllBudgets() {
        return budgetRepo.findAll();
    }

    public Budget getBudgetById(Long id) {
        return budgetRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Budget with id " + id + " not found"));
    }

    public void deleteBudget(Long id) {
        Budget budget = getBudgetById(id);
        budgetRepo.delete(budget);
    }

    public List<Budget> getBudgetsByUser(User user) {
        return budgetRepo.findByUser(user);
    }

    public List<Budget> getBudgetsByCategory(Category category) {
        return budgetRepo.findByCategory(category);
    }
}

