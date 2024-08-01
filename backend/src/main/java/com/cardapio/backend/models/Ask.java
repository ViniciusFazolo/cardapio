package com.cardapio.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Ask {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String ask;

    @ManyToOne
    private DescriptionAsk description;
}
