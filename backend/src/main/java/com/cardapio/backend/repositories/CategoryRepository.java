package com.cardapio.backend.repositories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cardapio.backend.models.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String>{
    
    Optional<Category> findByDescription(String description);

}
