package com.cardapio.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cardapio.backend.DTO.request.RequestProductDTO;
import com.cardapio.backend.DTO.response.ResponseProductDTO;
import com.cardapio.backend.services.ProductService;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<ResponseProductDTO> save(@ModelAttribute RequestProductDTO request){
        return productService.save(request);
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<ResponseProductDTO>> listAll(){
        return productService.listAll();
    }

    @GetMapping("/listByCategory/{id}")
    public ResponseEntity<List<ResponseProductDTO>> listByCategory(@PathVariable String id){
        return productService.listByCategory(id);
    }

    @GetMapping("/assets/{filename}")
    public ResponseEntity<Resource> file(@PathVariable String filename){
        return productService.file(filename);
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<ResponseProductDTO> findById(@PathVariable String id){
        return productService.findById(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseProductDTO> update(@ModelAttribute RequestProductDTO request, @PathVariable String id){
        return productService.update(request, id);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable String id){
        productService.delete(id);
    }

}
