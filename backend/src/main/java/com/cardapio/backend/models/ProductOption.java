package com.cardapio.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class ProductOption {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String option;

    @JsonIgnore
    @ManyToOne
    private ProductOptionTitle description;
}
