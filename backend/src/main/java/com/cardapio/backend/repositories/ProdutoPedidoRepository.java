package com.cardapio.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cardapio.backend.models.ProdutoPedido;

@Repository
public interface ProdutoPedidoRepository extends JpaRepository<ProdutoPedido, String>{
    
}
