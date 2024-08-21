package com.cardapio.backend.DTO.response;

import java.util.List;

import com.cardapio.backend.models.ProductOption;

public record ResponseProductOptionDTO(String id, String description, boolean required, int qtOptionsSelected, List<ProductOption> productOptions) {
}
