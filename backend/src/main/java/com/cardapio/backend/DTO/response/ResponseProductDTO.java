package com.cardapio.backend.DTO.response;

import java.util.List;

import com.cardapio.backend.models.Category;
import com.cardapio.backend.models.ProductOptionTitle;

public record ResponseProductDTO(
    String id,
    float price,
    String description,
    String image,
    Category category,
    List<ProductOptionTitle> productOptionTitle
) {
    
}
