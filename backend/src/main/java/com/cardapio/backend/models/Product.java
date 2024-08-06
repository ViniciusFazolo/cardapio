package com.cardapio.backend.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private float price;
    private String description;
    private String urlImage;

    @ManyToOne
    private Category category;

    @ManyToMany
    private List<ProductOptionTitle> productOptionTitles;
}
