package com.cardapio.backend.DTO.response;

import com.cardapio.backend.models.Categoria;

public record ResponseProdutoDTO(
    String id,
    String nome,
    float valor,
    String descricao,
    int quantidade,
    String urlImage,
    Categoria categoria,
    boolean ativo
) {
    
}
