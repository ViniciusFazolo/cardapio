package com.cardapio.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.cardapio.backend.exception.DescriptionUniqueException;

@RestControllerAdvice
public class AplicationControllerAdvice {
    
    @ExceptionHandler(DescriptionUniqueException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public String handleDescriptionUniqueException(DescriptionUniqueException ex){
        return ex.getMessage();
    }
}
