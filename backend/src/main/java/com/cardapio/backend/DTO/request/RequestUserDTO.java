package com.cardapio.backend.DTO.request;

public record RequestUserDTO(
    String id,
    String name,
    String email,
    String password,
    Boolean active
) {
    
}
