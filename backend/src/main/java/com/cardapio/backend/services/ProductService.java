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

import com.cardapio.backend.DTO.mapper.ProductMapper;
import com.cardapio.backend.DTO.request.RequestProductDTO;
import com.cardapio.backend.DTO.response.ResponseProductDTO;
import com.cardapio.backend.exception.DescriptionUniqueException;
import com.cardapio.backend.models.Category;
import com.cardapio.backend.models.Product;
import com.cardapio.backend.repositories.CategoryRepository;
import com.cardapio.backend.repositories.ProductRepository;
import com.cardapio.backend.util.UtilFunctions;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductMapper productMapper;

    private final String uploadDir = "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static"
            + File.separator + "productImages";

    public ResponseEntity<ResponseProductDTO> save(RequestProductDTO request) {
        if(request.id() != null){
            productRepository.findById(request.id()).ifPresent(product -> {
                throw new RuntimeException("Product already exists");
            });
        }

        if(productRepository.findByDescription(request.description()).isPresent()){
            throw new DescriptionUniqueException();
        }
        
        // salva a imagem no diretório especificado
        MultipartFile image = request.image();
        String imageUrl = UtilFunctions.saveImage(image, uploadDir);

        Product product = new Product();
        product.setPrice(request.price());
        product.setDescription(request.description());
        product.setUrlImage(imageUrl);

        Category category = categoryRepository.findById(request.category()).orElseThrow(() -> new RuntimeException("Category not found"));
        product.setCategory(category);

        product = productRepository.save(product);
        return ResponseEntity.ok().body(productMapper.toDTO(product));
    }

    public ResponseEntity<List<ResponseProductDTO>> listByCategory(String id){
        List<ResponseProductDTO> products = productRepository.findByCategoryId(id).stream().map(productMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok().body(products);
    }

    public ResponseEntity<List<ResponseProductDTO>> listAll(){
        List<ResponseProductDTO> products = productRepository.findAll().stream().map(productMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok().body(products);
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

    public ResponseEntity<ResponseProductDTO> findById(String id){
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));

        return ResponseEntity.ok().body(productMapper.toDTO(product));
    }

    public ResponseEntity<ResponseProductDTO> update(RequestProductDTO request, String id){
        return productRepository.findById(id).map(product -> {
            product.setPrice(request.price());
            Category category = categoryRepository.findById(request.category()).orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);

            if(productRepository.findByDescription(request.description()).isPresent()){
                throw new DescriptionUniqueException();
            }
            product.setDescription(request.description());

            if(!request.image().equals(null)){

                if(!request.image().getOriginalFilename().equals(product.getUrlImage())){
                    // apaga o arquivo antes de atualizar
                    UtilFunctions.fileExistsDelete(product.getUrlImage(), uploadDir);

                    if(request.image() != null){
                        String imageUrl = UtilFunctions.saveImage(request.image(), uploadDir);
                        product.setUrlImage(imageUrl);
                    }
                }
            }

            Product updatedProduct = productRepository.save(product);
            return ResponseEntity.ok().body(productMapper.toDTO(updatedProduct));
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void delete(String id){
        if(productRepository.existsById(id)){
            Optional<Product> obj = productRepository.findById(id);
            UtilFunctions.fileExistsDelete(obj.get().getUrlImage(), uploadDir);

            productRepository.deleteById(id);
        }
        else{
            throw new RuntimeException("Product not found");
        }
    }

    
}
