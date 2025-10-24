package com.nt.backend.service;


import org.springframework.stereotype.Service;

import com.nt.backend.entity.Category;
import com.nt.backend.entity.User;
import com.nt.backend.exception.ResourceNotFoundException;
import com.nt.backend.repo.CategoryRepo;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepo categoryRepo;

    public CategoryService(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    public Category saveCategory(Category category) {
        return categoryRepo.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    public List<Category> getCategoriesByUser(User user) {
        return categoryRepo.findByUser(user);
    }

    public Category getCategoryById(Long id) {
        return categoryRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category with id " + id + " not found"));
    }

    public void deleteCategory(Long id) {
        Category category = getCategoryById(id);
        categoryRepo.delete(category);
    }
}

