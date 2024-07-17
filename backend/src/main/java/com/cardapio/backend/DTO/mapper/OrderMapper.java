package com.cardapio.backend.DTO.mapper;

import org.springframework.stereotype.Component;

import com.cardapio.backend.DTO.request.RequestOrderDTO;
import com.cardapio.backend.DTO.response.ResponseOrderDTO;
import com.cardapio.backend.models.Customer_Order;

@Component
public class OrderMapper {
    
    public Customer_Order toEntity(RequestOrderDTO request){
        Customer_Order order = new Customer_Order();
        order.setTableNumber(request.tableNumber());
        order.setPhoneNumber(request.phoneNumber());
        order.setClientName(request.clientName());

        return order;
    }

    public ResponseOrderDTO toDTO(Customer_Order order){
        return new ResponseOrderDTO(
            order.getId(),
            order.getTableNumber(),
            order.getPhoneNumber(),
            order.getClientName(),
            order.getDateHour()
        );
    }

}
