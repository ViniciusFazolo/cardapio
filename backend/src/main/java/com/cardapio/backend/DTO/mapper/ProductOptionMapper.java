package com.cardapio.backend.DTO.mapper;

import com.cardapio.backend.DTO.response.ResponseProductOptionDTO;
import com.cardapio.backend.models.ProductOption;
import com.cardapio.backend.models.ProductOptionTitle;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class ProductOptionMapper {
    
    // public DescriptionOptions toEntity(RequestDescriptionOptionsDTO request) {

    //     DescriptionOptions descriptionAsk = new DescriptionOptions();
    //     descriptionAsk.setDescription(request.description());

    //     return descriptionAsk;
    // }

    public ResponseProductOptionDTO toDTO(ProductOptionTitle productOptionTitle, List<ProductOption> options) {
        
        return new ResponseProductOptionDTO(
            productOptionTitle.getId(),
            productOptionTitle.getDescription(),
            options
        );
    }

}
