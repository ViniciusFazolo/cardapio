package com.cardapio.backend.DTO.request;

public record RequestOrderDTO(
    String id,
    int tableNumber,
    int phoneNumber,
    String clientName,
    double valueTotalOrder
) {
    
}
