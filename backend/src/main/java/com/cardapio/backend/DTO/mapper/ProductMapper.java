package com.cardapio.backend.DTO.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cardapio.backend.DTO.request.RequestProductDTO;
import com.cardapio.backend.DTO.response.ResponseProductDTO;
import com.cardapio.backend.models.Category;
import com.cardapio.backend.models.Product;
import com.cardapio.backend.repositories.CategoryRepository;

@Component
public class ProductMapper {
    @Autowired
    private CategoryRepository categoryRepository;
    
    public Product toEntity(RequestProductDTO request){
        Product product = new Product();
        product.setPrice(request.price());
        product.setDescription(request.description());
        product.setImageName(request.image().getOriginalFilename());
        product.setProductOptionTitles(request.productOptionTitle());

        Category category = categoryRepository.findById(request.category()).orElseThrow(() -> new RuntimeException("Category not found"));
        product.setCategory(category);

        return product;
    }

    public ResponseProductDTO toDTO(Product product){
        return new ResponseProductDTO(
            product.getId(),
            product.getPrice(),
            product.getDescription(),
            "http://localhost:8080/productImages/" + product.getImageName(),
            product.getCategory(),
            product.getProductOptionTitles()
        );
    }

}
