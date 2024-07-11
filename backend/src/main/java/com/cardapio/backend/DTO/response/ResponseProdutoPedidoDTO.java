package com.cardapio.backend.DTO.response;

import com.cardapio.backend.models.Pedido;
import com.cardapio.backend.models.Produto;

public record ResponseProdutoPedidoDTO(
    String id,
    Produto produto,
    Pedido pedido,
    int quantidade
) {
    
}
