package com.cardapio.backend.DTO.mapper;

import org.springframework.stereotype.Component;

import com.cardapio.backend.DTO.request.RequestOrderDTO;
import com.cardapio.backend.DTO.response.ResponseOrderDTO;
import com.cardapio.backend.models.Order;

@Component
public class OrderMapper {
    
    public Order toEntity(RequestOrderDTO request){
        Order order = new Order();
        order.setTableNumber(request.tableNumber());
        order.setPhoneNumber(request.phoneNumber());
        order.setClientName(request.clientName());
        order.setValueTotalOrder(request.valueTotalOrder());
        return order;
    }

    public ResponseOrderDTO toDTO(Order order){
        return new ResponseOrderDTO(
            order.getId(),
            order.getTableNumber(),
            order.getPhoneNumber(),
            order.getClientName(),
            order.getDateHour(),
            order.getValueTotalOrder(),
            order.isStatusOrder()
        );
    }

    public Order toEntity(Order order){
        Order newOrder = new Order();
        newOrder.setId(order.getId());
        newOrder.setTableNumber(order.getTableNumber());
        newOrder.setPhoneNumber(order.getPhoneNumber());
        newOrder.setClientName(order.getClientName());
        newOrder.setDateHour(order.getDateHour());
        newOrder.setValueTotalOrder(order.getValueTotalOrder());
        newOrder.setStatusOrder(order.isStatusOrder());
        return newOrder;
    }

}
