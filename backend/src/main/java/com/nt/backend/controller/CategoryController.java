package com.nt.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nt.backend.entity.Category;
import com.nt.backend.entity.User;
import com.nt.backend.service.CategoryService;
import com.nt.backend.service.UserService;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
// @CrossOrigin(origins="*")
public class CategoryController {

    private final CategoryService categoryService;
    private final UserService userService;

    public CategoryController(CategoryService categoryService, UserService userService) {
        this.categoryService = categoryService;
        this.userService = userService;
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Category> createCategory(@PathVariable Long userId, @RequestBody Category category) {
        User user = userService.getUserById(userId);
        category.setUser(user);
        return ResponseEntity.status(201).body(categoryService.saveCategory(category));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Category>> getCategoriesByUser(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(categoryService.getCategoriesByUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category updatedCategory) {
        Category category = categoryService.getCategoryById(id);
        category.setName(updatedCategory.getName());
        return ResponseEntity.ok(categoryService.saveCategory(category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
