package com.cardapio.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cardapio.backend.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, String>{

    List<Product> findByCategoryId(String id);
    
}
