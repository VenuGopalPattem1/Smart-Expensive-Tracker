package com.nt.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nt.backend.entity.Budget;
import com.nt.backend.entity.User;
import com.nt.backend.entity.Category;
import com.nt.backend.service.BudgetService;
import com.nt.backend.service.UserService;
import com.nt.backend.service.CategoryService;
import java.util.List;

@RestController
@RequestMapping("/api/budgets")
// @CrossOrigin(origins="*")
public class BudgetController {

    private final BudgetService budgetService;
    private final UserService userService;
    private final CategoryService categoryService;

    public BudgetController(BudgetService budgetService, UserService userService, CategoryService categoryService) {
        this.budgetService = budgetService;
        this.userService = userService;
        this.categoryService = categoryService;
    }

    @PostMapping("/user/{userId}/category/{categoryId}")
    public ResponseEntity<Budget> createBudget(@PathVariable Long userId,
                                               @PathVariable Long categoryId,
                                               @RequestBody Budget budget) {
        User user = userService.getUserById(userId);
        budget.setUser(user);

        if (categoryId != null) {
            Category category = categoryService.getCategoryById(categoryId);
            budget.setCategory(category);
        }

        return ResponseEntity.status(201).body(budgetService.saveBudget(budget));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Budget>> getBudgetsByUser(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(budgetService.getBudgetsByUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Budget> getBudgetById(@PathVariable Long id) {
        return ResponseEntity.ok(budgetService.getBudgetById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Budget> updateBudget(@PathVariable Long id, @RequestBody Budget updatedBudget) {
        Budget budget = budgetService.getBudgetById(id);
        budget.setLimitAmount(updatedBudget.getLimitAmount());
        budget.setStartDate(updatedBudget.getStartDate());
        budget.setEndDate(updatedBudget.getEndDate());
        return ResponseEntity.ok(budgetService.saveBudget(budget));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long id) {
        budgetService.deleteBudget(id);
        return ResponseEntity.noContent().build();
    }
}
