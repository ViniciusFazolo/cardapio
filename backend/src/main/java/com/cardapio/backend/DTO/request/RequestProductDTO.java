package com.cardapio.backend.DTO.request;

import org.springframework.web.multipart.MultipartFile;

import com.cardapio.backend.models.Category;

public record RequestProductDTO(
    String id,
    float price,
    String description,
    MultipartFile image,
    Category category
) {
    
}
