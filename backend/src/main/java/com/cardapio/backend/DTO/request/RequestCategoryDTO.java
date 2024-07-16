package com.cardapio.backend.DTO.request;

import org.springframework.web.multipart.MultipartFile;

public record RequestCategoryDTO(
    String id,
    MultipartFile image,
    String description
) {
    
}
