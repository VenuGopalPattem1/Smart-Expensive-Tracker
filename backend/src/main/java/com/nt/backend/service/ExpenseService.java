package com.nt.backend.service;


import org.springframework.stereotype.Service;

import com.nt.backend.entity.Category;
import com.nt.backend.entity.Expenses;
import com.nt.backend.entity.User;
import com.nt.backend.exception.ResourceNotFoundException;
import com.nt.backend.repo.ExpenseRepo;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepo expenseRepo;

    public ExpenseService(ExpenseRepo expenseRepo) {
        this.expenseRepo = expenseRepo;
    }

    public Expenses saveExpense(Expenses expense) {
        return expenseRepo.save(expense);
    }

    public List<Expenses> getAllExpenses() {
        return expenseRepo.findAll();
    }

    public Expenses getExpenseById(Long id) {
        return expenseRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense with id " + id + " not found"));
    }

    public void deleteExpense(Long id) {
        Expenses expense = getExpenseById(id);
        expenseRepo.delete(expense);
    }

    public List<Expenses> getExpensesByUser(User user) {
        return expenseRepo.findByUser(user);
    }

    public List<Expenses> getExpensesByCategory(Category category) {
        return expenseRepo.findByCategory(category);
    }

    public List<Expenses> getExpensesByUserAndDateRange(User user, LocalDate start, LocalDate end) {
        return expenseRepo.findByUserAndDateBetween(user, start, end);
    }

    public double getTotalExpenseByUserAndDateRange(User user, LocalDate start, LocalDate end) {
        return getExpensesByUserAndDateRange(user, start, end)
                .stream().mapToDouble(Expenses::getAmount).sum();
    }
}

