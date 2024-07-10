package com.cardapio.backend.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Pedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private int numeroMesa;
    private int numeroCelular;
    private String nomeCliente;
    private LocalDateTime dataHora;
    private boolean ativo = true;

}
