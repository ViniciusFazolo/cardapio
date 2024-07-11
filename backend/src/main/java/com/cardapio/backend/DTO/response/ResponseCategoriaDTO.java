package com.cardapio.backend.DTO.response;

public record ResponseCategoriaDTO(
    String id,
    String nome,
    String descricao,
    boolean ativo
) {
    
}
