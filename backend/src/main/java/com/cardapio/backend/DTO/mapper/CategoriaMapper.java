package com.cardapio.backend.DTO.mapper;

import org.springframework.stereotype.Component;

import com.cardapio.backend.DTO.request.RequestCategoriaDTO;
import com.cardapio.backend.DTO.response.ResponseCategoriaDTO;
import com.cardapio.backend.models.Categoria;

@Component
public class CategoriaMapper {
    
    public Categoria toEntity(RequestCategoriaDTO request) {

        Categoria categoria = new Categoria();
        categoria.setNome(request.nome());
        categoria.setDescricao(request.descricao());
        return categoria;
    }

    public ResponseCategoriaDTO toDTO(Categoria categoria) {
        
        return new ResponseCategoriaDTO(
            categoria.getId(),
            categoria.getNome(),
            categoria.getDescricao(),
            categoria.isAtivo()
        );

    }

}
