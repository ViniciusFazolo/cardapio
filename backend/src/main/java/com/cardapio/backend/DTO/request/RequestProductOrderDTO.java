package com.cardapio.backend.DTO.request;

import com.cardapio.backend.models.Order;
import com.cardapio.backend.models.Product;

public record RequestProductOrderDTO(
    String id,
    Product product,
    Order order,
    int quantity
) {
    
}
