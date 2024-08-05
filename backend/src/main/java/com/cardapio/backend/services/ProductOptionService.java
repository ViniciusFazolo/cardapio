package com.cardapio.backend.services;

import com.cardapio.backend.DTO.mapper.ProductOptionMapper;
import com.cardapio.backend.DTO.request.RequestProductOptionDTO;
import com.cardapio.backend.DTO.response.ResponseProductOptionDTO;
import com.cardapio.backend.models.ProductOption;
import com.cardapio.backend.models.ProductOptionTitle;
import com.cardapio.backend.repositories.ProductOptionRepository;
import com.cardapio.backend.repositories.ProductOptionTitleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductOptionService {

    @Autowired
    private ProductOptionTitleRepository productOptionTitleRepository;

    @Autowired
    private ProductOptionRepository productOptionRepository;

    @Autowired
    private ProductOptionMapper productOptionMapper;

    public ResponseEntity<ResponseProductOptionDTO> save(RequestProductOptionDTO request) {
        ProductOptionTitle productOptionTitle = new ProductOptionTitle();
        productOptionTitle.setDescription(request.description());
        productOptionTitle.setRequired(request.required());
        productOptionTitleRepository.save(productOptionTitle);

        List<ProductOption> options = new ArrayList<ProductOption>();

        for (ProductOption item : request.options()) {
            ProductOption option = new ProductOption();
            option.setOption(item.getOption());
            option.setDescription(productOptionTitle);

            options.add(productOptionRepository.save(option));
        }

        return ResponseEntity.ok(new ResponseProductOptionDTO(productOptionTitle.getId(),
                productOptionTitle.getDescription(), productOptionTitle.isRequired(), options));
    }

    public ResponseEntity<List<ResponseProductOptionDTO>> listAll() {
        List<ResponseProductOptionDTO> descriptionAsks = productOptionTitleRepository.findAll().stream()
                .map(descriptionAsk -> {
                    List<ProductOption> options = productOptionRepository.findByDescription(descriptionAsk);
                    return productOptionMapper.toDTO(descriptionAsk, options);
                }).collect(Collectors.toList());

        return ResponseEntity.ok().body(descriptionAsks);
    }

    public ResponseEntity<ResponseProductOptionDTO> findById(String id) {
        ProductOptionTitle productOptionTitle = productOptionTitleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Descricao das opções não encontrado"));

        List<ProductOption> options = productOptionRepository.findByDescription(productOptionTitle);

        ResponseProductOptionDTO responseDTO = productOptionMapper.toDTO(productOptionTitle, options);

        return ResponseEntity.ok().body(responseDTO);
    }

    public ResponseEntity<ResponseProductOptionDTO> update(RequestProductOptionDTO request, String id) {
        return productOptionTitleRepository.findById(id).map(productOptionTitle -> {
            productOptionTitle.setDescription(request.description());
            productOptionTitle.setRequired(request.required());
            
            List<ProductOption> currentProductOptions = productOptionRepository.findByDescription(productOptionTitle);
            
            //Atualiza a lista
            List<String> updatedOptionIds = request.options().stream()
            .map(ProductOption::getId)
            .collect(Collectors.toList());

            List<ProductOption> productOptionsToRemove = currentProductOptions.stream()
            .filter(option -> !updatedOptionIds.contains(option.getId()))
            .collect(Collectors.toList());

            if(!productOptionsToRemove.isEmpty()){
                productOptionRepository.deleteAll(productOptionsToRemove);
            }

            //Atualiza os valores
            for(ProductOption productOptionUpdate : request.options()){
                if(productOptionUpdate.getId() == null){
                    productOptionUpdate.setDescription(productOptionTitle);
                    productOptionRepository.save(productOptionUpdate);
                }else{
                    productOptionRepository.findById(productOptionUpdate.getId()).ifPresent(productOption -> {
                        productOption.setOption(productOptionUpdate.getOption());
                        productOptionRepository.save(productOption);
                    });
                }
            }
            
            currentProductOptions = productOptionRepository.findByDescription(productOptionTitle);
            productOptionTitleRepository.save(productOptionTitle);

            return ResponseEntity.ok().body(productOptionMapper.toDTO(productOptionTitle, currentProductOptions));
        }).orElseThrow(() -> new RuntimeException("Descrição das opções não encontrada"));
    }

    public void delete(String id) {
        ProductOptionTitle descriptionOption = productOptionTitleRepository.findById(id).orElseThrow(() -> new RuntimeException("Coleção de perguntas não encontrada"));

        List<ProductOption> options = productOptionRepository.findByDescription(descriptionOption);
        productOptionRepository.deleteAll(options);

        productOptionTitleRepository.delete(descriptionOption);
    }

}
