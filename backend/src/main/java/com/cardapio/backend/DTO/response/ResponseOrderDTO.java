package com.cardapio.backend.DTO.response;

import java.time.LocalDateTime;

public record ResponseOrderDTO(
    String id,
    int tableNumber,
    String phoneNumber,
    String clientName,
    LocalDateTime dateHour,
    double valueTotalOrder,
    boolean statusOrder
) {
    
}
