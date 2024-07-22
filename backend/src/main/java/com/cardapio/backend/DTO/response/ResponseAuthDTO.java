package com.cardapio.backend.DTO.response;

public record ResponseAuthDTO(
    String id,
    String name,
    String email,
    Boolean active,
    String token
) {
    
}
