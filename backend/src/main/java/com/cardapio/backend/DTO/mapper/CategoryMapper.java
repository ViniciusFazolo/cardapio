package com.cardapio.backend.DTO.mapper;

import org.springframework.stereotype.Component;

import com.cardapio.backend.DTO.request.RequestCategoryDTO;
import com.cardapio.backend.DTO.response.ResponseCategoryDTO;
import com.cardapio.backend.models.Category;

@Component
public class CategoryMapper {
    
    public Category toEntity(RequestCategoryDTO request) {

        Category category = new Category();
        category.setDescription(request.description());
        category.setUrlImage(request.image().getOriginalFilename());
        return category;
    }

    public ResponseCategoryDTO toDTO(Category category) {
        
        return new ResponseCategoryDTO(
            category.getId(),
            category.getUrlImage(),
            category.getDescription()
        );
    }

}
