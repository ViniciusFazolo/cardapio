package com.cardapio.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cardapio.backend.models.ProductOrder;

@Repository
public interface ProductOrderRepository extends JpaRepository<ProductOrder, String>{
    
}
