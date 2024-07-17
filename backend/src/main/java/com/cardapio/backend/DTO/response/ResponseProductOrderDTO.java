package com.cardapio.backend.DTO.response;

import com.cardapio.backend.models.Customer_Order;
import com.cardapio.backend.models.Product;

public record ResponseProductOrderDTO(
    String id,
    Product product,
    Customer_Order order,
    int quantity
) {
    
}
