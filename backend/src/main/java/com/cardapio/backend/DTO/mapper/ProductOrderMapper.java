package com.cardapio.backend.DTO.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cardapio.backend.DTO.request.RequestProductOrderDTO;
import com.cardapio.backend.DTO.response.ResponseProductOrderDTO;
import com.cardapio.backend.models.Order;
import com.cardapio.backend.models.Product;
import com.cardapio.backend.models.ProductOrder;
import com.cardapio.backend.repositories.OrderRepository;
import com.cardapio.backend.repositories.ProductRepository;

@Component
public class ProductOrderMapper {
    
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    public ProductOrder toEntity(RequestProductOrderDTO request){
        ProductOrder productOrder = new ProductOrder();
        //productOrder.setId(request.id());
        Product product = productRepository.findById(request.product()).orElseThrow(() -> new RuntimeException("Product not found"));
        productOrder.setProduct(product);
        Order order = orderRepository.findById(request.order()).orElseThrow(() -> new RuntimeException("Order not found"));
        productOrder.setOrder(order);
        productOrder.setQuantity(request.quantity());
        
        return productOrder;
    }
    
    public ResponseProductOrderDTO toDTO(ProductOrder productOrder){
        return new ResponseProductOrderDTO(
            productOrder.getId(),
            productOrder.getProduct(),
            productOrder.getOrder(),
            productOrder.getQuantity()
        );
    }
    
}
