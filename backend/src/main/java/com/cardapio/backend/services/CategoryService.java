package com.cardapio.backend.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
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

    private final String uploadDir = System.getProperty("user.dir") + File.separator + "backend" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "categoryImages";

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

            //apaga o arquivo antes de atualizar
            fileExists(category.getUrlImage());

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
            //gera um nome único
            String uniqueFilename = UUID.randomUUID().toString();
            
            //salva a extensão do arquivo
            String imageExtension = getFileExtension(image.getOriginalFilename());
   
            String filename = uniqueFilename + "." + imageExtension;
   
            Path path = Paths.get(uploadDir, filename); // caminho que vai salvar
            Files.write(path, image.getBytes()); //salva no caminho especificado
            return filename;
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar a imagem", e);
        }
    }

    private static String getFileExtension(String fileName) {
        if(fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        } else {
            return "";
        }
    }

    private void fileExists(String imageUrl){
        File directory = new File(uploadDir);
        File[] files = directory.listFiles();

        if (files != null) {
            for (File file : files) {
                if (file.isFile() && file.getName().equalsIgnoreCase(imageUrl)) {
                    file.delete();
                    break;
                }
            }
        }
    }
}
