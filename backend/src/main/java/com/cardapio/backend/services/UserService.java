package com.cardapio.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cardapio.backend.DTO.mapper.UserMapper;
import com.cardapio.backend.DTO.request.RequestAuthDTO;
import com.cardapio.backend.DTO.request.RequestUserDTO;
import com.cardapio.backend.DTO.response.ResponseAuthDTO;
import com.cardapio.backend.DTO.response.ResponseUserDTO;
import com.cardapio.backend.models.User;
import com.cardapio.backend.repositories.UserRepository;
import com.cardapio.backend.security.TokenService;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserMapper userMapper;

    public ResponseEntity<ResponseAuthDTO> save(RequestUserDTO request){
        if(request.id() != null){
            userRepository.findByEmail(request.email()).ifPresent(user -> {
                throw new RuntimeException("Usuario already exists");
            });
        }
        
        User newUser = new User();
        newUser.setName(request.name());
        newUser.setEmail(request.email());
        newUser.setPassword(passwordEncoder.encode(request.password()));
        newUser.setActive(request.active());
        userRepository.save(newUser);

        String token = tokenService.generateToken(newUser);
        
        return ResponseEntity.ok(new ResponseAuthDTO(newUser.getId(), newUser.getName(), newUser.getEmail(), newUser.getActive(), token));
    }

    public ResponseEntity<ResponseAuthDTO> login(RequestAuthDTO request){
        User user = this.userRepository.findByEmail(request.email()).orElseThrow(() -> new RuntimeException("User not found"));
        if(passwordEncoder.matches(request.password(),user.getPassword())){
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseAuthDTO(user.getId(), user.getName(), user.getEmail(), user.getActive(), token));
        }
        return ResponseEntity.badRequest().build();
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
