package com.cardapio.backend.DTO.request;

import org.springframework.web.multipart.MultipartFile;

public record RequestProductDTO(
    String id,
    float price,
    String description,
    MultipartFile image,
    String category
) {
    
}
