package com.cardapio.backend.DTO.response;

import java.time.LocalDateTime;

public record ResponsePedidoDTO(
    String id,
    int numeroMesa,
    int numeroCelular,
    String nomeCliente,
    LocalDateTime dataHora,
    boolean ativo
) {
    
}
