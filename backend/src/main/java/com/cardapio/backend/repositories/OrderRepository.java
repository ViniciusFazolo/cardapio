package com.cardapio.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cardapio.backend.models.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, String>{

    Order findByPhoneNumber(String phoneNumber);
    
}
