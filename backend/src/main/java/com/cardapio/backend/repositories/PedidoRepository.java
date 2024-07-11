package com.cardapio.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cardapio.backend.models.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, String>{
    
}
