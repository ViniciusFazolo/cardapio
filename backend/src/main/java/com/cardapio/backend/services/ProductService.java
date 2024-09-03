package com.cardapio.backend.services;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
import com.cardapio.backend.models.ProductOptionTitle;
import com.cardapio.backend.repositories.CategoryRepository;
import com.cardapio.backend.repositories.ProductOptionTitleRepository;
import com.cardapio.backend.repositories.ProductRepository;
import com.cardapio.backend.util.UtilFunctions;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductOptionTitleRepository productOptionTitleRepository;

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
        product.setImageName(imageUrl);
        product.setProductOptionTitles(request.productOptionTitle());
        
        Category category = categoryRepository.findById(request.category()).orElseThrow(() -> new RuntimeException("Category not found"));
        product.setCategory(category);
        
        category.getProducts().add(product);

        for(ProductOptionTitle obj : request.productOptionTitle()){
            if(obj.getId() == null) {
                obj = productOptionTitleRepository.save(obj);
            }
            obj.getProducts().add(product);
        }

        product = productRepository.save(product);
        categoryRepository.save(category);
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
        System.out.println(request);
        return productRepository.findById(id).map(product -> {
            productRepository.findByDescription(request.description()).ifPresent(obj -> {
                if(!obj.getId().equals(product.getId())){
                    throw new DescriptionUniqueException();
                }
            });
           
            product.setDescription(request.description());
            product.setPrice(request.price());
            
            //categoria antiga
            Category oldCategory = categoryRepository.findById(product.getCategory().getId()).orElseThrow(() -> new RuntimeException("Category not found"));
            
            //categoria atual
            Category currentCategory = categoryRepository.findById(request.category()).orElseThrow(() -> new RuntimeException("Category not found"));
            
            product.setCategory(currentCategory);

            //verifica se o produto não permance com a mesma categoria. Então remove da velha lista e adiciona na atual
            if(!product.getCategory().getId().equals(oldCategory.getId())){
                oldCategory.getProducts().remove(product);
                currentCategory.getProducts().add(product);
            }
            
            if(request.image() != null){
                if(!request.image().getOriginalFilename().equals(product.getImageName())){
                    // apaga o arquivo antes de atualizar
                    UtilFunctions.fileExistsDelete(product.getImageName(), uploadDir);

                    if(request.image() != null){
                        String imageUrl = UtilFunctions.saveImage(request.image(), uploadDir);
                        product.setImageName(imageUrl);
                    }
                }
            }
            
            Set<ProductOptionTitle> newOptions = new HashSet<>(request.productOptionTitle());
            Set<ProductOptionTitle> currentOptions = new HashSet<>(product.getProductOptionTitles());

            Set<ProductOptionTitle> optionsToRemove = new HashSet<>(currentOptions);
            optionsToRemove.removeAll(newOptions);
            
            Set<ProductOptionTitle> optionsToAdd = new HashSet<>(newOptions);
            optionsToAdd.removeAll(currentOptions);

            // Remove opções antigas do banco
            if (!optionsToRemove.isEmpty()) {
                product.getProductOptionTitles().removeAll(optionsToRemove);
                for (ProductOptionTitle option : optionsToRemove) {
                    option.getProducts().remove(product);
                    productOptionTitleRepository.save(option);
                }
            }

            // Adiciona novas opções no banco
            if (!optionsToAdd.isEmpty()) {
                product.getProductOptionTitles().addAll(optionsToAdd);
                for (ProductOptionTitle option : optionsToAdd) {
                    option.getProducts().add(product);
                    productOptionTitleRepository.save(option);
                }
            }

            Product updatedProduct = productRepository.save(product);
            return ResponseEntity.ok().body(productMapper.toDTO(updatedProduct));
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void delete(String id){
        if(productRepository.existsById(id)){
            Product obj = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
            
            Category category = categoryRepository.findById(obj.getCategory().getId()).orElseThrow(() -> new RuntimeException("Category not found"));
            category.getProducts().remove(obj);

            UtilFunctions.fileExistsDelete(obj.getImageName(), uploadDir);

            productRepository.deleteById(id);
        }
        else{
            throw new RuntimeException("Product not found");
        }
    }

    
}
