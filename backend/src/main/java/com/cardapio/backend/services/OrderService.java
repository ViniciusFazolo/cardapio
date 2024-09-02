package com.cardapio.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cardapio.backend.DTO.mapper.OrderMapper;
import com.cardapio.backend.DTO.request.RequestOrderDTO;
import com.cardapio.backend.DTO.response.ResponseOrderDTO;
import com.cardapio.backend.models.Order;
import com.cardapio.backend.repositories.OrderRepository;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderMapper orderMapper;

    public ResponseEntity<ResponseOrderDTO> save(RequestOrderDTO request) {

        Order existingOrder = orderRepository.findByPhoneNumber(request.phoneNumber());
        if (existingOrder != null && existingOrder.isStatusOrder()) {
            existingOrder.setValueTotalOrder(existingOrder.getValueTotalOrder() + request.valueTotalOrder());
            orderRepository.save(orderMapper.toEntity(existingOrder));
            return ResponseEntity.ok().body(orderMapper.toDTO(existingOrder));
        }
    
        Order newOrder = orderRepository.save(orderMapper.toEntity(request));
        return ResponseEntity.ok().body(orderMapper.toDTO(newOrder));
    }

    public ResponseEntity<ResponseOrderDTO> findByPhoneNumber(int phoneNumber) {
        return ResponseEntity.ok().body(orderMapper.toDTO(orderRepository.findByPhoneNumber(phoneNumber)));
    }


    public ResponseEntity<List<ResponseOrderDTO>> listAll(){
        List<ResponseOrderDTO> orders = orderRepository.findAll().stream().map(orderMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok().body(orders);
    }

    public ResponseEntity<ResponseOrderDTO> findById(String id){
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        return ResponseEntity.ok().body(orderMapper.toDTO(order));
    }

    public ResponseEntity<ResponseOrderDTO> closeCont(int phoneNumber){
        Order order = orderRepository.findByPhoneNumber(phoneNumber);
        order.setStatusOrder(false);
        orderRepository.save(order);
        return ResponseEntity.ok().body(orderMapper.toDTO(order));
    }

    public ResponseEntity<ResponseOrderDTO> update(RequestOrderDTO request, String id){
        return orderRepository.findById(id).map(order -> {
            order.setTableNumber(request.tableNumber());
            order.setPhoneNumber(request.phoneNumber());
            order.setClientName(request.clientName());

            Order updatedOrder = orderRepository.save(order);
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
