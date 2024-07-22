package com.cardapio.backend.DTO.mapper;

import org.springframework.stereotype.Component;

import com.cardapio.backend.DTO.request.RequestProductDTO;
import com.cardapio.backend.DTO.response.ResponseProductDTO;
import com.cardapio.backend.models.Product;

@Component
public class ProductMapper {
    
    public Product toEntity(RequestProductDTO request){
        Product product = new Product();
        product.setPrice(request.price());
        product.setDescription(request.description());
        product.setUrlImage(request.image().getOriginalFilename());
        product.setCategory(request.category());

        return product;
    }

    public ResponseProductDTO toDTO(Product product){
        return new ResponseProductDTO(
            product.getId(),
            product.getPrice(),
            product.getDescription(),
            product.getUrlImage(),
            product.getCategory()
        );
    }

}
