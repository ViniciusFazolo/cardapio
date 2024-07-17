package com.cardapio.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cardapio.backend.DTO.mapper.OrderMapper;
import com.cardapio.backend.DTO.request.RequestOrderDTO;
import com.cardapio.backend.DTO.response.ResponseOrderDTO;
import com.cardapio.backend.models.Customer_Order;
import com.cardapio.backend.repositories.OrderRepository;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderMapper orderMapper;

    public ResponseEntity<ResponseOrderDTO> save(RequestOrderDTO request) {
        if(request.id() != null){
            orderRepository.findById(request.id()).ifPresent(order -> {
                throw new RuntimeException("Order already exists");
            });
        }

        Customer_Order newOrder = orderRepository.save(orderMapper.toEntity(request));
        return ResponseEntity.ok().body(orderMapper.toDTO(newOrder));
    }

    public ResponseEntity<List<ResponseOrderDTO>> listAll(){
        List<ResponseOrderDTO> orders = orderRepository.findAll().stream().map(orderMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok().body(orders);
    }

    public ResponseEntity<ResponseOrderDTO> findById(String id){
        Customer_Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        return ResponseEntity.ok().body(orderMapper.toDTO(order));
    }

    public ResponseEntity<ResponseOrderDTO> update(RequestOrderDTO request, String id){
        return orderRepository.findById(id).map(order -> {
            order.setTableNumber(request.tableNumber());
            order.setPhoneNumber(request.phoneNumber());
            order.setClientName(request.clientName());

            Customer_Order updatedOrder = orderRepository.save(order);
            return ResponseEntity.ok().body(orderMapper.toDTO(updatedOrder));
        }).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public void delete(String id){
        if(orderRepository.existsById(id)){
            orderRepository.deleteById(id);
        } else {
            throw new RuntimeException("Order not found");
        }
    }


}
