package com.cardapio.backend.DTO.response;

import com.cardapio.backend.models.Category;

public record ResponseProductDTO(
    String id,
    String name,
    float price,
    String description,
    int quantity,
    String urlImage,
    Category category
) {
    
}
