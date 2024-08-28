package com.cardapio.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cardapio.backend.DTO.request.RequestProductOrderDTO;
import com.cardapio.backend.DTO.response.ResponseProductOrderDTO;
import com.cardapio.backend.services.ProductOrderService;

@RestController
@RequestMapping("/product-order")
public class ProductOrderController {
    
    @Autowired
    private ProductOrderService productOrderService;

    @PostMapping("/create")
    public ResponseEntity<ResponseProductOrderDTO> save(@RequestBody RequestProductOrderDTO request){
        return productOrderService.save(request);
    }

    @GetMapping("/totalSales")
    public ResponseEntity<Double> getTotalCont() {
        return productOrderService.getTotalCont();
    }

}
