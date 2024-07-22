package com.cardapio.backend.DTO.response;

public record ResponseUserDTO(
    String id,
    String name,
    String email,
    String password,
    Boolean active
) {
    
}
