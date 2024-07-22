package com.cardapio.backend.DTO.request;

import com.cardapio.backend.models.Category;

public record RequestProductDTO(
    String id,
    float price,
    String description,
    String urlImage,
    Category category
) {
    
}
