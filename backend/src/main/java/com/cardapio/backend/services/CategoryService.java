package com.cardapio.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cardapio.backend.DTO.mapper.CategoryMapper;
import com.cardapio.backend.DTO.request.RequestCategoryDTO;
import com.cardapio.backend.DTO.response.ResponseCategoryDTO;
import com.cardapio.backend.models.Category;
import com.cardapio.backend.repositories.CategoryRepository;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryMapper categoryMapper;


    public ResponseEntity<ResponseCategoryDTO> save(RequestCategoryDTO request) {
        if(request.id() != null){
            categoryRepository.findById(request.id()).ifPresent(category -> {
                throw new RuntimeException("Category already exists");
            });
        }

        Category newCategory = categoryRepository.save(categoryMapper.toEntity(request));
        return ResponseEntity.ok().body(categoryMapper.toDTO(newCategory));
    }

    public ResponseEntity<List<ResponseCategoryDTO>> listAll(){
        List<ResponseCategoryDTO> categorys = categoryRepository.findAll().stream().map(categoryMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok().body(categorys);
    }

    public ResponseEntity<ResponseCategoryDTO> findById(String id){
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));

        return ResponseEntity.ok().body(categoryMapper.toDTO(category));
    }

    public ResponseEntity<ResponseCategoryDTO> update(RequestCategoryDTO request, String id){
        return categoryRepository.findById(id).map(category -> {
            category.setName(request.name());
            category.setDescription(request.description());

            Category updatedCategory = categoryRepository.save(category);
            return ResponseEntity.ok().body(categoryMapper.toDTO(updatedCategory));
        }).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public void delete(String id){
        if(categoryRepository.existsById(id)){
            categoryRepository.deleteById(id);
        }
        else{
            throw new RuntimeException("Category not found");
        }
    }
}
