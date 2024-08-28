package com.cardapio.backend.DTO.response;

import com.cardapio.backend.models.Order;
import com.cardapio.backend.models.Product;

public record ResponseProductOrderDTO(
    String id,
    Product product,
    Order order,
    int quantity,
    double valueTotalOrder
) {
    
}
