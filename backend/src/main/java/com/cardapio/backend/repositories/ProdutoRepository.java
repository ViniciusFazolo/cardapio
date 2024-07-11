package com.cardapio.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cardapio.backend.models.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, String>{
    
}
