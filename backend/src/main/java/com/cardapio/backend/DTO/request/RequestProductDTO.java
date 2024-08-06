package com.cardapio.backend.DTO.request;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.cardapio.backend.models.ProductOptionTitle;

public record RequestProductDTO(
    String id,
    float price,
    String description,
    MultipartFile image,
    String category,
    List<ProductOptionTitle> productOptionTitle
) {
    
}
