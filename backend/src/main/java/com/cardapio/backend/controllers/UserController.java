package com.cardapio.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cardapio.backend.DTO.request.RequestUserDTO;
import com.cardapio.backend.DTO.response.ResponseUserDTO;
import com.cardapio.backend.services.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<ResponseUserDTO> save(@RequestBody RequestUserDTO request){
        return userService.save(request);
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<ResponseUserDTO>> listAll(){
        return userService.listAll();
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<ResponseUserDTO> findById(@PathVariable String id){
        return userService.findById(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseUserDTO> update(@RequestBody RequestUserDTO request, @PathVariable String id){
        return userService.update(request, id);
    }

    @GetMapping("/delete/{id}")
    public void delete(@PathVariable String id){
        userService.delete(id);
    }

}
