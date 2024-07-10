package com.cardapio.backend.DTO.request;

public record RequestPedidoDTO(
    String id,
    int numeroMesa,
    int numeroCelular,
    String nomeCliente
) {
    
}
