package com.cardapio.backend.DTO.response;

import java.util.List;

public record ResponseCategoryDTO(
    String id,
    String imageUrl,
    String description,
    List<ResponseProductDTO> products
) {
    
}
