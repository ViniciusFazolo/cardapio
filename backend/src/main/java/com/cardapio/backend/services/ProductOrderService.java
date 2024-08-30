package com.cardapio.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cardapio.backend.DTO.mapper.ProductOrderMapper;
import com.cardapio.backend.DTO.request.RequestProductOrderDTO;
import com.cardapio.backend.DTO.response.ResponseProductOrderDTO;
import com.cardapio.backend.models.ProductOrder;
import com.cardapio.backend.repositories.ProductOrderRepository;

@Service
public class ProductOrderService {

    @Autowired
    private ProductOrderRepository productOrderRepository;

    @Autowired
    private ProductOrderMapper productOrderMapper;

    public ResponseEntity<ResponseProductOrderDTO> save(RequestProductOrderDTO request){
        if (request.id() != null) {
            productOrderRepository.findById(request.id()).ifPresent(category -> {
                throw new RuntimeException("ProductOrder already exists");
            });
        }

        ProductOrder newProductOrder = productOrderRepository.save(productOrderMapper.toEntity(request));
        return ResponseEntity.ok().body(productOrderMapper.toDTO(newProductOrder));
    }

    public ResponseEntity<ResponseProductOrderDTO> findByPhoneNumberRecently(int phoneNumber){
        return ResponseEntity.ok().body(productOrderMapper.toDTO(productOrderRepository.findRecentlyByPhoneNumber(phoneNumber)));
    }
}
