package com.cardapio.backend.DTO.request;

import com.cardapio.backend.models.Customer_Order;
import com.cardapio.backend.models.Product;

public record RequestProductOrderDTO(
    String id,
    Product product,
    Customer_Order order,
    int quantity
) {
    
}
