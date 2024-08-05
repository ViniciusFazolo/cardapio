package com.cardapio.backend.DTO.request;

import java.util.List;

import com.cardapio.backend.models.ProductOption;

public record RequestProductOptionDTO(String description, boolean required, List<ProductOption> options) {
    
}