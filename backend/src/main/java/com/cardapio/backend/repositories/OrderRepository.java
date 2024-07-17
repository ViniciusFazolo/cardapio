package com.cardapio.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cardapio.backend.models.Customer_Order;

@Repository
public interface OrderRepository extends JpaRepository<Customer_Order, String>{
    
}
