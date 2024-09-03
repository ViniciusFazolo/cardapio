package com.cardapio.backend.DTO.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cardapio.backend.DTO.request.RequestCategoryDTO;
import com.cardapio.backend.DTO.response.ResponseCategoryDTO;
import com.cardapio.backend.DTO.response.ResponseProductDTO;
import com.cardapio.backend.models.Category;

@Component
public class CategoryMapper {

    @Autowired
    private ProductMapper productMapper;
    
    public Category toEntity(RequestCategoryDTO request) {

        Category category = new Category();
        category.setDescription(request.description());
        category.setImageName(request.image().getOriginalFilename());
        return category;
    }

    public ResponseCategoryDTO toDTO(Category category) {
        List<ResponseProductDTO> products = null;
        
        if(category.getProducts() != null){
            products = category.getProducts().stream().map(productMapper::toDTO).collect(Collectors.toList());
        }
            
        return new ResponseCategoryDTO(
            category.getId(),
            "http://localhost:8080/categoryImages/" + category.getImageName(),
            category.getDescription(),
            products
        );
    }

}
