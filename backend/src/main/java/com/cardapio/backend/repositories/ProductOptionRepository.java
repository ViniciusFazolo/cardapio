package com.cardapio.backend.repositories;


import com.cardapio.backend.models.ProductOption;
import com.cardapio.backend.models.ProductOptionTitle;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductOptionRepository extends JpaRepository<ProductOption, String>{
    List<ProductOption> findByDescription(ProductOptionTitle productOptionTitle);
}
