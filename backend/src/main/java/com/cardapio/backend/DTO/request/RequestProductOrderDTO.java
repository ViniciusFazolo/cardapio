package com.cardapio.backend.DTO.request;

public record RequestProductOrderDTO(
    String id,
    String product,
    String order,
    int quantity
) {
    
}
