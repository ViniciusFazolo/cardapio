package com.cardapio.backend.DTO.request;

import com.cardapio.backend.models.Category;

public record RequestProductDTO(
    String id,
    String name,
    float price,
    String description,
    int quantity,
    String urlImage,
    Category category
) {
    
}
