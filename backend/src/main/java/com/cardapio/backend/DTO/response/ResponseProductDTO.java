package com.cardapio.backend.DTO.response;

import com.cardapio.backend.models.Category;

public record ResponseProductDTO(
    String id,
    float price,
    String description,
    String urlImage,
    Category category
) {
    
}
