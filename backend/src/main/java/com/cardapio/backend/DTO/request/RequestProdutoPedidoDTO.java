package com.cardapio.backend.DTO.request;

import com.cardapio.backend.models.Pedido;
import com.cardapio.backend.models.Produto;

public record RequestProdutoPedidoDTO(
    String id,
    Produto produto,
    Pedido pedido,
    int quantidade
) {
    
}
