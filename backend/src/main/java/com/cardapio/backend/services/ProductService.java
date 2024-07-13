package com.cardapio.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cardapio.backend.DTO.mapper.ProductMapper;
import com.cardapio.backend.DTO.request.RequestProductDTO;
import com.cardapio.backend.DTO.response.ResponseProductDTO;
import com.cardapio.backend.models.Product;
import com.cardapio.backend.repositories.ProductRepository;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;


    public ResponseEntity<ResponseProductDTO> save(RequestProductDTO request) {
        if(request.id() != null){
            productRepository.findById(request.id()).ifPresent(product -> {
                throw new RuntimeException("Product already exists");
            });
        }

        Product newProduct = productRepository.save(productMapper.toEntity(request));
        return ResponseEntity.ok().body(productMapper.toDTO(newProduct));
    }

    public ResponseEntity<List<ResponseProductDTO>> listAll(){
        List<ResponseProductDTO> products = productRepository.findAll().stream().map(productMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok().body(products);
    }

    public ResponseEntity<ResponseProductDTO> findById(String id){
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));

        return ResponseEntity.ok().body(productMapper.toDTO(product));
    }

    public ResponseEntity<ResponseProductDTO> update(RequestProductDTO request, String id){
        return productRepository.findById(id).map(product -> {
            product.setName(request.name());
            product.setPrice(request.price());
            product.setDescription(request.description());
            product.setQuantity(request.quantity());
            product.setUrlImage(request.urlImage());
            product.setCategory(request.category());

            Product updatedProduct = productRepository.save(product);
            return ResponseEntity.ok().body(productMapper.toDTO(updatedProduct));
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void delete(String id){
        if(productRepository.existsById(id)){
            productRepository.deleteById(id);
        }
        else{
            throw new RuntimeException("Product not found");
        }
    }
}
