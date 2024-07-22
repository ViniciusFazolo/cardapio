package com.cardapio.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cardapio.backend.DTO.mapper.UserMapper;
import com.cardapio.backend.DTO.request.RequestUserDTO;
import com.cardapio.backend.DTO.response.ResponseUserDTO;
import com.cardapio.backend.models.User;
import com.cardapio.backend.repositories.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    public ResponseEntity<ResponseUserDTO> save(RequestUserDTO request){
        if(request.id() != null){
            userRepository.findByEmail(request.email()).ifPresent(user -> {
                throw new RuntimeException("Usuario already exists");
            });
        }
        
        User newUser = userRepository.save(userMapper.toEntity(request));
        return ResponseEntity.ok().body(userMapper.toDTO(newUser));
    }

    public ResponseEntity<List<ResponseUserDTO>> listAll(){
        List<ResponseUserDTO> users = userRepository.findAll().stream().map(userMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok().body(users);
    }

    public ResponseEntity<ResponseUserDTO> findById(String id){
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok().body(userMapper.toDTO(user));
    }

    public ResponseEntity<ResponseUserDTO> update(RequestUserDTO request, String id){
        return userRepository.findById(id).map(user -> {
            user.setName(request.name());
            user.setEmail(request.email());
            user.setPassword(request.password());
            user.setActive(request.active());

            User updatedUser = userRepository.save(user);
            return ResponseEntity.ok().body(userMapper.toDTO(updatedUser));
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void delete(String id){
        if(userRepository.existsById(id)){
            userRepository.deleteById(id);
        }
        else{
            throw new RuntimeException("User not found");
        }
    }

}
