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
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
        productOptionTitle.setQtOptionsSelected(request.qtOptionsSelected());
        productOptionTitleRepository.save(productOptionTitle);

        List<ProductOption> options = new ArrayList<ProductOption>();

        for (ProductOption item : request.productOptions()) {
            item.setDescription(productOptionTitle);
            options.add(productOptionRepository.save(item));
        }

        return ResponseEntity.ok(new ResponseProductOptionDTO(productOptionTitle.getId(),
                productOptionTitle.getDescription(), productOptionTitle.isRequired(), productOptionTitle.getQtOptionsSelected(),options));
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
            productOptionTitle.setQtOptionsSelected(request.qtOptionsSelected());

            Set<ProductOption> updateOptions = new HashSet<>();
            for (ProductOption option : request.productOptions()) {
                option.setDescription(productOptionTitle);
                updateOptions.add(option);
            }

            List<ProductOption> current = productOptionRepository.findByDescription(productOptionTitle);
            Set<ProductOption> currentOptions = new HashSet<>(current);

            Set<ProductOption> optionsToRemove = new HashSet<>(currentOptions);
            optionsToRemove.removeAll(updateOptions);
            Set<ProductOption> optionsToAdd = new HashSet<>(updateOptions);
            optionsToAdd.removeAll(currentOptions); 

            if(!optionsToRemove.isEmpty()){
                productOptionRepository.deleteAll(optionsToRemove);
            }

            if(!optionsToAdd.isEmpty()){
                productOptionRepository.saveAll(optionsToAdd);
            }

            //Atualiza os valores 
            for(ProductOption productOptionUpdate : request.productOptions()){
                if(productOptionUpdate.getId() == null){
                    productOptionUpdate.setDescription(productOptionTitle); //vincula a um titulo
                    productOptionRepository.save(productOptionUpdate);
                }else{
                    productOptionRepository.findById(productOptionUpdate.getId()).ifPresent(productOption -> {
                        productOption.setOption(productOptionUpdate.getOption());
                        productOptionRepository.save(productOption);
                    });
                }
            }
            
            List<ProductOption> currentProductOptions = productOptionRepository.findByDescription(productOptionTitle);
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
