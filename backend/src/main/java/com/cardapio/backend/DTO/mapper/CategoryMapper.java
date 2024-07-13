package com.cardapio.backend.DTO.mapper;

import org.springframework.stereotype.Component;

import com.cardapio.backend.DTO.request.RequestCategoryDTO;
import com.cardapio.backend.DTO.response.ResponseCategoryDTO;
import com.cardapio.backend.models.Category;

@Component
public class CategoryMapper {
    
    public Category toEntity(RequestCategoryDTO request) {

        Category category = new Category();
        category.setName(request.name());
        category.setDescription(request.description());
        return category;
    }

    public ResponseCategoryDTO toDTO(Category category) {
        
        return new ResponseCategoryDTO(
            category.getId(),
            category.getName(),
            category.getDescription()
        );
    }

}
