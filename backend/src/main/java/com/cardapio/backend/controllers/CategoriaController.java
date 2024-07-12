package com.cardapio.backend.controllers;

import java.util.List;

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

import com.cardapio.backend.DTO.request.RequestCategoriaDTO;
import com.cardapio.backend.DTO.response.ResponseCategoriaDTO;
import com.cardapio.backend.services.CategoriaService;

@RestController
@RequestMapping("/api/categoria")
public class CategoriaController {
    
    @Autowired
    private CategoriaService categoriaService;

    @PostMapping("/create")
    public ResponseEntity<ResponseCategoriaDTO> save(@RequestBody RequestCategoriaDTO request){
            return categoriaService.save(request);
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<ResponseCategoriaDTO>> listAll(){
        return categoriaService.listAll();
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<ResponseCategoriaDTO> findById(@PathVariable String id){
        return categoriaService.findById(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseCategoriaDTO> update(@RequestBody RequestCategoriaDTO request, @PathVariable String id){
        return categoriaService.update(request, id);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable String id){
        categoriaService.delete(id);
    }

}
