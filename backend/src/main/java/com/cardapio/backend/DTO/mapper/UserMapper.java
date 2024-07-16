package com.cardapio.backend.DTO.mapper;

import org.springframework.stereotype.Component;

import com.cardapio.backend.DTO.request.RequestUserDTO;
import com.cardapio.backend.DTO.response.ResponseUserDTO;
import com.cardapio.backend.models.User;

@Component
public class UserMapper {

    public User toEntity(RequestUserDTO request){
        User usuario = new User();
        usuario.setName(request.name());
        usuario.setEmail(request.email());
        usuario.setPassword(request.password());
        return usuario;
    }

    public ResponseUserDTO toDTO(User usuario){
        return new ResponseUserDTO(
            usuario.getId(),
            usuario.getName(),
            usuario.getEmail(),
            usuario.getPassword()
        );
    }
}
