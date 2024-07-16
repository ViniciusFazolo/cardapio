package com.cardapio.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cardapio.backend.DTO.request.RequestOrderDTO;
import com.cardapio.backend.DTO.response.ResponseOrderDTO;
import com.cardapio.backend.services.OrderService;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<ResponseOrderDTO> save(@RequestBody RequestOrderDTO request){
        return orderService.save(request);
    }
    
    @GetMapping("/listAll")
    public ResponseEntity<List<ResponseOrderDTO>> listAll(){
        return orderService.listAll();
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<ResponseOrderDTO> findById(@PathVariable String id){
        return orderService.findById(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseOrderDTO> update(@RequestBody RequestOrderDTO request, @PathVariable String id){
        return orderService.update(request, id);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable String id){
        orderService.delete(id);
    }
    
}
