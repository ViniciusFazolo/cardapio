package com.cardapio.backend.controllers;

import com.cardapio.backend.DTO.request.RequestProductOptionDTO;
import com.cardapio.backend.DTO.response.ResponseProductOptionDTO;
import com.cardapio.backend.services.ProductOptionService;
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

import java.util.List;

@RestController
@RequestMapping("/api/productOption")
public class ProductOptionController {
    
    @Autowired
    private ProductOptionService productOptionService;

    @PostMapping("/create")
    public ResponseEntity<ResponseProductOptionDTO> save(@RequestBody RequestProductOptionDTO request){
        return productOptionService.save(request);
    }

   @GetMapping("/listAll")
   public ResponseEntity<List<ResponseProductOptionDTO>> listAll(){
       return productOptionService.listAll();
   }

   @GetMapping("/list/{id}")
   public ResponseEntity<ResponseProductOptionDTO> findById(@PathVariable String id){
       return productOptionService.findById(id);
   }

   @PutMapping("/update/{id}")
   public ResponseEntity<ResponseProductOptionDTO> update(@RequestBody RequestProductOptionDTO request, @PathVariable String id){
       return productOptionService.update(request, id);
   }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable String id){
        productOptionService.delete(id);
    }

}
