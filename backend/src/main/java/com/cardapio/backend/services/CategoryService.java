package com.cardapio.backend.services;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cardapio.backend.DTO.mapper.CategoryMapper;
import com.cardapio.backend.DTO.request.RequestCategoryDTO;
import com.cardapio.backend.DTO.response.ResponseCategoryDTO;
import com.cardapio.backend.exception.DescriptionUniqueException;
import com.cardapio.backend.models.Category;
import com.cardapio.backend.repositories.CategoryRepository;
import com.cardapio.backend.util.UtilFunctions;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryMapper categoryMapper;

    private final String uploadDir = "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static"
            + File.separator + "categoryImages";

    public ResponseEntity<ResponseCategoryDTO> save(RequestCategoryDTO request) {
        if (request.id() != null) {
            categoryRepository.findById(request.id()).ifPresent(category -> {
                throw new RuntimeException("Category already exists");
            });
        }

        if(categoryRepository.findByDescription(request.description()).isPresent()){
            throw new DescriptionUniqueException();
        }

        // salva a imagem no diretório especificado
        MultipartFile image = request.image();
        String imageName = UtilFunctions.saveImage(image, uploadDir);

        Category category = new Category();
        category.setDescription(request.description());
        category.setImageName(imageName);
        category.setProducts(null);

        category = categoryRepository.save(category);
        return ResponseEntity.ok().body(categoryMapper.toDTO(category));
    }

    public ResponseEntity<List<ResponseCategoryDTO>> listAll() {
        List<ResponseCategoryDTO> categorys = categoryRepository.findAll().stream().map(categoryMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok().body(categorys);
    }

    public ResponseEntity<Resource> file(String filename) {
        Path path = Paths.get(uploadDir, filename);
        String imgExtension = UtilFunctions.getFileExtension(filename);
        Resource img = null;
        MediaType mediaType = null;

        try {
            img = new UrlResource(path.toUri());

            if (imgExtension.equals("png")) {
                mediaType = MediaType.IMAGE_PNG;
            } else {
                mediaType = MediaType.IMAGE_JPEG;
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok().contentType(mediaType).body(img);
    }

    public ResponseEntity<ResponseCategoryDTO> findById(String id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return ResponseEntity.ok().body(categoryMapper.toDTO(category));
    }

    public ResponseEntity<ResponseCategoryDTO> update(RequestCategoryDTO request, String id) {
        return categoryRepository.findById(id).map(category -> {
            categoryRepository.findByDescription(request.description()).ifPresent(obj -> {
                if(!obj.getId().equals(category.getId())){
                    throw new DescriptionUniqueException();
                }
            });
            
            category.setDescription(request.description());

            if (!request.image().equals(null)) {

                if (!request.image().getOriginalFilename().equals(category.getImageName())) {
                    // apaga o arquivo antes de atualizar
                    UtilFunctions.fileExistsDelete(category.getImageName(), uploadDir);

                    if (request.image() != null) {
                        String imageName = UtilFunctions.saveImage(request.image(), uploadDir);
                        category.setImageName(imageName);
                    }
                }
            }

            Category updatedCategory = categoryRepository.save(category);
            return ResponseEntity.ok().body(categoryMapper.toDTO(updatedCategory));
        }).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public void delete(String id) {
        if (categoryRepository.existsById(id)) {
            Optional<Category> obj = categoryRepository.findById(id);
            UtilFunctions.fileExistsDelete(obj.get().getImageName(), uploadDir);

            categoryRepository.deleteById(id);
        } else {
            throw new RuntimeException("Category not found");
        }
    }

   
}
