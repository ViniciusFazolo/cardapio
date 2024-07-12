package com.cardapio.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cardapio.backend.DTO.mapper.CategoriaMapper;
import com.cardapio.backend.DTO.request.RequestCategoriaDTO;
import com.cardapio.backend.DTO.response.ResponseCategoriaDTO;
import com.cardapio.backend.models.Categoria;
import com.cardapio.backend.repositories.CategoriaRepository;

@Service
public class CategoriaService {
    
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private CategoriaMapper categoriaMapper;


    public ResponseEntity<ResponseCategoriaDTO> save(RequestCategoriaDTO request) {
        if(request.id() != null){
            categoriaRepository.findById(request.id()).ifPresent(categoria -> {
                throw new RuntimeException("Categoria já cadastrada");
            });
        }

        Categoria newCategoria = categoriaRepository.save(categoriaMapper.toEntity(request));
        return ResponseEntity.ok().body(categoriaMapper.toDTO(newCategoria));
    }

    public ResponseEntity<List<ResponseCategoriaDTO>> listAll(){
        List<ResponseCategoriaDTO> categorias = categoriaRepository.findAll().stream().map(categoriaMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok().body(categorias);
    }

    public ResponseEntity<ResponseCategoriaDTO> findById(String id){
        Categoria categoria = categoriaRepository.findById(id).orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        return ResponseEntity.ok().body(categoriaMapper.toDTO(categoria));
    }

    public ResponseEntity<ResponseCategoriaDTO> update(RequestCategoriaDTO request, String id){
        return categoriaRepository.findById(id).map(categoria -> {
            categoria.setNome(request.nome());
            categoria.setDescricao(request.descricao());

            Categoria updatedCategoria = categoriaRepository.save(categoria);
            return ResponseEntity.ok().body(categoriaMapper.toDTO(updatedCategoria));
        }).orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
    }

    public void delete(String id){
        if(categoriaRepository.existsById(id)){
            categoriaRepository.deleteById(id);
        }
        else{
            throw new RuntimeException("Categoria não encontrada");
        }
    }
}
