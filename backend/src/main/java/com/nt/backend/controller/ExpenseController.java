package com.nt.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nt.backend.entity.Expenses;
import com.nt.backend.entity.User;
import com.nt.backend.entity.Category;
import com.nt.backend.service.ExpenseService;
import com.nt.backend.service.UserService;
import com.nt.backend.service.CategoryService;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
// @CrossOrigin(origins="*")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final UserService userService;
    private final CategoryService categoryService;

    public ExpenseController(ExpenseService expenseService, UserService userService, CategoryService categoryService) {
        this.expenseService = expenseService;
        this.userService = userService;
        this.categoryService = categoryService;
    }

    @PostMapping(path="/user/{userId}/category/{categoryId}",consumes = "application/json")
    public ResponseEntity<Expenses> createExpense(@PathVariable Long userId,
            @PathVariable Long categoryId,
            @RequestBody Expenses expense) {
        User user = userService.getUserById(userId);
        expense.setUser(user);

        if (categoryId != null) {
            Category category = categoryService.getCategoryById(categoryId);
            expense.setCategory(category);
        }

        return ResponseEntity.status(201).body(expenseService.saveExpense(expense));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Expenses>> getExpensesByUser(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(expenseService.getExpensesByUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expenses> getExpenseById(@PathVariable Long id) {
        return ResponseEntity.ok(expenseService.getExpenseById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expenses> updateExpense(@PathVariable Long id, @RequestBody Expenses updatedExpense) {
        Expenses Expenses = expenseService.getExpenseById(id);
        Expenses.setAmount(updatedExpense.getAmount());
        Expenses.setDescription(updatedExpense.getDescription());
        Expenses.setDate(updatedExpense.getDate());
        Expenses.setPaymentMethod(updatedExpense.getPaymentMethod());
        return ResponseEntity.ok(expenseService.saveExpense(Expenses));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
