package com.cardapio.backend.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cardapio.backend.DTO.mapper.CategoryMapper;
import com.cardapio.backend.DTO.request.RequestCategoryDTO;
import com.cardapio.backend.DTO.response.ResponseCategoryDTO;
import com.cardapio.backend.models.Category;
import com.cardapio.backend.repositories.CategoryRepository;


@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryMapper categoryMapper;

    private final String uploadDir = "resources\\static\\images";

    public CategoryService() {
        try {
            Files.createDirectories(Paths.get(uploadDir));
        } catch (IOException e) {
            throw new RuntimeException("Directory not exists", e);
        }
    }


    public ResponseEntity<ResponseCategoryDTO> save(RequestCategoryDTO request) {
        if(request.id() != null){
            categoryRepository.findById(request.id()).ifPresent(category -> {
                throw new RuntimeException("Category already exists");
            });
        }

        // salva a imagem no diretório especificado
        MultipartFile image = request.image();
        String imageUrl = saveImage(image);

        Category category = new Category();
        category.setDescription(request.description());
        category.setUrlImage(imageUrl);

        category = categoryRepository.save(category);
        return ResponseEntity.ok().body(categoryMapper.toDTO(category));
    }

    public ResponseEntity<List<ResponseCategoryDTO>> listAll(){
        List<ResponseCategoryDTO> categorys = categoryRepository.findAll().stream().map(categoryMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok().body(categorys);
    }

    public ResponseEntity<ResponseCategoryDTO> findById(String id){
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));

        return ResponseEntity.ok().body(categoryMapper.toDTO(category));
    }

    public ResponseEntity<ResponseCategoryDTO> update(RequestCategoryDTO request, String id){
        return categoryRepository.findById(id).map(category -> {
            category.setDescription(request.description());

            if (request.image() != null) {
                String imageUrl = saveImage(request.image());
                category.setUrlImage(imageUrl);
            }

            Category updatedCategory = categoryRepository.save(category);
            return ResponseEntity.ok().body(categoryMapper.toDTO(updatedCategory));
        }).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public void delete(String id){
        if(categoryRepository.existsById(id)){
            categoryRepository.deleteById(id);
        }
        else{
            throw new RuntimeException("Category not found");
        }
    }

    private String saveImage(MultipartFile image) {
        try {
            String filename = image.getOriginalFilename();
            Path path = Paths.get(uploadDir + filename); // caminho que vai salvar
            Files.write(path, image.getBytes()); //salva no caminho especificado
            return filename;
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar a imagem", e);
        }
    }
}
