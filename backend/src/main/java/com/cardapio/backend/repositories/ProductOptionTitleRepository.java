package com.cardapio.backend.repositories;


import com.cardapio.backend.models.ProductOptionTitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductOptionTitleRepository extends JpaRepository<ProductOptionTitle, String>{
    
}
