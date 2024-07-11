package com.cardapio.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cardapio.backend.models.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, String>{
    
}
