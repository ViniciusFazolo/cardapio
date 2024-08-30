package com.cardapio.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cardapio.backend.models.ProductOrder;

@Repository
public interface ProductOrderRepository extends JpaRepository<ProductOrder, String>{

    @Query("SELECT po FROM ProductOrder po WHERE po.order.phoneNumber = :phoneNumber ORDER BY po.order.dateHour DESC")
    List<ProductOrder> findMostRecentByPhoneNumber(@Param("phoneNumber") int phoneNumber);

    default ProductOrder findRecentlyByPhoneNumber(int phoneNumber){
        List<ProductOrder> list = findMostRecentByPhoneNumber(phoneNumber);
        if (list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }
    
}
