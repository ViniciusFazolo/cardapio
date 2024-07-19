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

import com.cardapio.backend.DTO.request.RequestCategoryDTO;
import com.cardapio.backend.DTO.response.ResponseCategoryDTO;
import com.cardapio.backend.services.CategoryService;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<ResponseCategoryDTO> save(@ModelAttribute RequestCategoryDTO request){
        return categoryService.save(request);
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<ResponseCategoryDTO>> listAll(){
        return categoryService.listAll();
    }

    @GetMapping("/assets/{filename}")
    public ResponseEntity<Resource> file(@PathVariable String filename){
        return categoryService.file(filename);
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<ResponseCategoryDTO> findById(@PathVariable String id){
        return categoryService.findById(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseCategoryDTO> update(@ModelAttribute RequestCategoryDTO request, @PathVariable String id){
        return categoryService.update(request, id);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable String id){
        categoryService.delete(id);
    }

}
