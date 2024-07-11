package com.cardapio.backend.DTO.request;

import com.cardapio.backend.models.Categoria;

public record RequestProdutoDTO(
    String id,
    String nome,
    float valor,
    String descricao,
    int quantidade,
    String urlImage,
    Categoria categoria
) {
    
}
