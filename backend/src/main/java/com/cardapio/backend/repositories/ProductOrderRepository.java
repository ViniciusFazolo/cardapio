package com.cardapio.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cardapio.backend.models.ProductOrder;

@Repository
public interface ProductOrderRepository extends JpaRepository<ProductOrder, String>{

    @Query("SELECT SUM(po.quantity * p.price) FROM ProductOrder po JOIN po.product p")
    Double getTotalCont();
}
