package com.cardapio.backend.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "tb_order")
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private int tableNumber;
    private String phoneNumber;
    private String clientName;
    private LocalDateTime dateHour = LocalDateTime.now();

    private double valueTotalOrder;

    private boolean statusOrder = true;

}
