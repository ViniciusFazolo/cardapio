package com.cardapio.backend.DTO.request;

import java.util.List;

import com.cardapio.backend.models.ProductOrder;

public record RequestOrderDTO(
    String id,
    int tableNumber,
    String phoneNumber,
    String clientName,
    double valueTotalOrder,
    List<ProductOrder> products

) {
    
}
